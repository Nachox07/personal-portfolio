import { expect, test } from "@playwright/test";
import { accents } from "../lib/accents";

const isDesktop = (width: number | undefined) => (width ?? 0) >= 1024;

test("every colour theme keeps all text at 4.5:1 or better", async ({ page }) => {
	await page.goto("/");
	const ratios = await page.evaluate((names) => {
		const lum = (rgb: number[]) => {
			const [r, g, b] = rgb.map((v) => {
				v /= 255;
				return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
			});
			return 0.2126 * r + 0.7152 * g + 0.0722 * b;
		};
		const read = (name: string) =>
			getComputedStyle(document.documentElement)
				.getPropertyValue(name)
				.trim()
				.split(/\s+/)
				.map(Number);
		const html = document.documentElement;
		const out: Record<string, number> = {};
		for (const dark of [false, true]) {
			html.classList.toggle("dark", dark);
			for (const a of names) {
				if (a === "teal") delete html.dataset.accent;
				else html.dataset.accent = a;
				for (const fg of ["--ink", "--muted", "--faint", "--accent"]) {
					for (const bg of ["--bg", "--surface"]) {
						const [x, y] = [lum(read(fg)), lum(read(bg))];
						out[`${a}/${dark ? "dark" : "light"} ${fg} on ${bg}`] =
							(Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
					}
				}
			}
		}
		return out;
	}, [...accents]);
	for (const [key, ratio] of Object.entries(ratios)) {
		expect(ratio, key).toBeGreaterThanOrEqual(4.5);
	}
});

test("shuffle changes the colour theme and remembers it", async ({ page }) => {
	await page.goto("/");
	const html = page.locator("html");
	await expect(html).not.toHaveAttribute("data-accent");
	await page.getByRole("button", { name: "Shuffle colour theme" }).click();
	const picked = await html.getAttribute("data-accent");
	expect(accents).toContain(picked);
	expect(picked).not.toBe("teal");
	// The background changes too, not only the accent.
	const bg = () =>
		page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--bg").trim());
	const before = await page.evaluate(() => {
		const el = document.documentElement;
		const saved = el.dataset.accent;
		delete el.dataset.accent;
		const v = getComputedStyle(el).getPropertyValue("--bg").trim();
		el.dataset.accent = saved;
		return v;
	});
	expect(await bg()).not.toBe(before);
	await page.reload();
	// Set by the inline script before paint, not after hydration.
	await expect(html).toHaveAttribute("data-accent", picked!);
});

test("copy email puts the address on the clipboard", async ({ page, context }) => {
	await context.grantPermissions(["clipboard-read", "clipboard-write"]);
	await page.goto("/");
	await page.getByRole("button", { name: "Copy email" }).click();
	await expect(page.getByRole("button", { name: "Copied ✓" })).toBeVisible();
	expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
		"hello@garilleti.me"
	);
});

test("portrait zooms slightly on hover", async ({ page, viewport }) => {
	test.skip(!isDesktop(viewport?.width), "hover only exists on desktop");
	await page.goto("/");
	const img = page.locator(".portrait img");
	await page.locator(".portrait").hover();
	// The zoom eases in over 0.25s; wait for it to finish rather than read it mid-way.
	await expect
		.poll(() => img.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a), {
			timeout: 10_000,
		})
		.toBeCloseTo(1.06, 2);
});

test("a grid cell follows the pointer in the hero", async ({ page, viewport }) => {
	test.skip(!isDesktop(viewport?.width), "pointer effect is desktop only");
	await page.goto("/");
	const cell = page.locator(".grid-cell");
	// The pointer handler only exists after hydration, so keep moving until it reacts.
	await expect(async () => {
		await page.mouse.move(300, 300);
		await page.mouse.move(310, 305);
		expect(await cell.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
	}).toPass({ timeout: 15_000 });
	const x = await cell.evaluate((el) => el.style.getPropertyValue("--x"));
	expect(Number.parseInt(x) % 22).toBe(0);
});

test("on phones the menu opens, jumps to a section and closes", async ({ page, viewport }) => {
	test.skip((viewport?.width ?? 0) >= 640, "the section links are in the header on wider screens");
	await page.goto("/");
	const button = page.getByRole("button", { name: "Open menu" });
	await button.click();
	await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
	await page.locator("#section-menu").getByRole("link", { name: "Experience" }).click();
	await expect(page).toHaveURL(/#experience$/);
	await expect(page.locator("#section-menu")).toBeHidden();
	await expect(page.locator("#experience-title")).toBeInViewport();
});

test("on phones Esc closes the menu and returns focus to its button", async ({ page, viewport }) => {
	test.skip((viewport?.width ?? 0) >= 640, "the section links are in the header on wider screens");
	await page.goto("/");
	await page.getByRole("button", { name: "Open menu" }).click();
	await page.keyboard.press("Escape");
	await expect(page.locator("#section-menu")).toBeHidden();
	await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

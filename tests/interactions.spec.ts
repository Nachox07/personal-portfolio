import { expect, test } from "@playwright/test";
import { accents } from "../lib/accents";

const isDesktop = (width: number | undefined) => (width ?? 0) >= 1024;

test("every accent reaches 4.5:1 on both theme backgrounds", async ({ page }) => {
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
				const [x, y] = [lum(read("--accent")), lum(read("--bg"))];
				out[`${a}/${dark ? "dark" : "light"}`] =
					(Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
			}
		}
		return out;
	}, [...accents]);
	for (const [key, ratio] of Object.entries(ratios)) {
		expect(ratio, key).toBeGreaterThanOrEqual(4.5);
	}
});

test("accent shuffle changes the colour and remembers it", async ({ page }) => {
	await page.goto("/");
	const html = page.locator("html");
	await expect(html).not.toHaveAttribute("data-accent");
	await page.getByRole("button", { name: "Shuffle accent colour" }).click();
	const picked = await html.getAttribute("data-accent");
	expect(accents).toContain(picked);
	expect(picked).not.toBe("teal");
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
	await expect
		.poll(() => img.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a))
		.toBeCloseTo(1.06, 2);
});

test("a grid cell follows the pointer in the hero", async ({ page, viewport }) => {
	test.skip(!isDesktop(viewport?.width), "pointer effect is desktop only");
	await page.goto("/");
	const cell = page.locator(".grid-cell");
	await page.mouse.move(300, 300);
	await page.mouse.move(310, 305);
	await expect.poll(() => cell.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
	const x = await cell.evaluate((el) => el.style.getPropertyValue("--x"));
	expect(Number.parseInt(x) % 22).toBe(0);
});

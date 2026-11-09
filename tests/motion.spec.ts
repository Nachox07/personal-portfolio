import { expect, test } from "@playwright/test";

const opacity = (sel: string) => (s: string) => getComputedStyle(document.querySelector(s)!).opacity;

test("blocks below the fold fade in once they scroll into view", async ({ page }) => {
	await page.goto("/");
	const row = "#experience li[data-reveal]";
	await expect.poll(() => page.evaluate(opacity(row), row)).toBe("0");
	await page.evaluate(() => document.querySelector("#experience-title")!.scrollIntoView({ block: "start" }));
	await expect.poll(() => page.evaluate(opacity(row), row)).toBe("1");
});

test.describe("without motion", () => {
	test.use({ contextOptions: { reducedMotion: "reduce" } });
	test("everything is visible straight away", async ({ page }) => {
		await page.goto("/");
		const row = "#experience li[data-reveal]";
		await expect.poll(() => page.evaluate(opacity(row), row)).toBe("1");
	});
});

test.describe("without JavaScript", () => {
	test.use({ javaScriptEnabled: false });
	test("everything is visible", async ({ page }) => {
		await page.goto("/");
		for (const sel of ["#work li[data-reveal]", "#experience li[data-reveal]", "#projects li[data-reveal]"]) {
			expect(await page.evaluate(opacity(sel), sel)).toBe("1");
		}
	});
});

test("the oldest projects fold under Earlier projects", async ({ page }) => {
	await page.goto("/");
	const earlier = page.locator("#projects details");
	await expect(earlier).not.toHaveAttribute("open", "");
	await earlier.locator("summary").click();
	await expect(earlier.getByRole("heading", { name: "Que Aprendemos Hoy" })).toBeVisible();
});

import { expect, test, type Page } from "@playwright/test";

async function settle(page: Page) {
	await page.goto("/");
	await page.evaluate(async () => {
		document.documentElement.style.scrollBehavior = "auto";
		// Load every lazy image, then go back to the top.
		document.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
		await Promise.all(
			Array.from(document.images).map((img) =>
				img.complete ? null : new Promise((r) => ((img.onload = img.onerror = () => r(null))))
			)
		);
		await document.fonts.ready;
		window.scrollTo(0, 0);
	});
}

test("full page matches the baseline", async ({ page }) => {
	await settle(page);
	await expect(page).toHaveScreenshot("page.png", {
		fullPage: true,
		// The copyright year changes every January.
		mask: [page.locator("footer small")],
	});
});

test("first screen matches the baseline", async ({ page }) => {
	await settle(page);
	await expect(page).toHaveScreenshot("top.png");
});

test("no sideways scroll", async ({ page }) => {
	await settle(page);
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth - window.innerWidth
	);
	expect(overflow).toBeLessThanOrEqual(0);
});

test("header shows the site name and fits", async ({ page }) => {
	await settle(page);
	const brand = page.getByRole("link", { name: "garilleti.me", exact: true });
	await expect(brand).toBeVisible();
	const nav = page.getByRole("navigation", { name: "Main" });
	const fits = await nav.evaluate((el) => el.scrollWidth <= el.clientWidth);
	expect(fits).toBe(true);
});

test("theme toggle switches and remembers", async ({ page }) => {
	await settle(page);
	const html = page.locator("html");
	const wasDark = await html.evaluate((el) => el.classList.contains("dark"));
	await page.getByRole("button", { name: "Toggle light and dark theme" }).click();
	await expect(html).toHaveClass(wasDark ? /^(?!.*\bdark\b)/ : /\bdark\b/);
	await page.reload();
	await expect(html).toHaveClass(wasDark ? /^(?!.*\bdark\b)/ : /\bdark\b/);
});

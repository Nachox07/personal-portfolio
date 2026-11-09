import { expect, test } from "@playwright/test";

test("an unknown case study returns 404", async ({ page }) => {
	const res = await page.goto("/projects/does-not-exist");
	expect(res?.status()).toBe(404);
});

test("the Whisperland case study renders without sideways scroll", async ({ page }) => {
	const res = await page.goto("/projects/whisperland");
	expect(res?.status()).toBe(200);
	await expect(page.getByRole("heading", { level: 1, name: "Whisperland" })).toBeVisible();
	await expect(page.getByText("Question for Nacho")).toHaveCount(0);
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
	expect(overflow).toBeLessThanOrEqual(0);
});

test("the project row opens its case study", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Whisperland iOS & Android App", exact: true }).click();
	await expect(page).toHaveURL(/\/projects\/whisperland$/);
});

test("gallery images open in a viewer with arrow keys and Esc", async ({ page }) => {
	await page.goto("/projects/whisperland");
	const opener = page.getByRole("button", { name: /^Open image: Whisperland welcome/ });
	await opener.click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	await expect(dialog).toHaveAccessibleName(/^Image 1 of 3/);
	await page.keyboard.press("ArrowRight");
	await expect(dialog).toHaveAccessibleName(/^Image 2 of 3/);
	await page.keyboard.press("ArrowLeft");
	await page.keyboard.press("ArrowLeft");
	await expect(dialog).toHaveAccessibleName(/^Image 3 of 3/);
	await page.getByRole("button", { name: "Previous image" }).click();
	await expect(dialog).toHaveAccessibleName(/^Image 2 of 3/);
	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
	await expect(opener).toBeFocused();
});

test("header links on a case study go back to home sections", async ({ page, viewport }) => {
	test.skip((viewport?.width ?? 0) < 640, "section links are hidden on phones");
	await page.goto("/projects/whisperland");
	await page.getByRole("link", { name: "Projects", exact: true }).click();
	await expect(page).toHaveURL(/\/#projects$/);
});

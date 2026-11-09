import { expect, test } from "@playwright/test";

const slugs = ["tardeo", "extraction-evals", "whisperland"];

test("an unknown case study returns 404", async ({ page }) => {
	const res = await page.goto("/projects/does-not-exist");
	expect(res?.status()).toBe(404);
});

for (const slug of slugs) {
	test(`case study ${slug} renders without sideways scroll`, async ({ page }) => {
		const res = await page.goto(`/projects/${slug}`);
		expect(res?.status()).toBe(200);
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - window.innerWidth
		);
		expect(overflow).toBeLessThanOrEqual(0);
	});

	test(`case study ${slug} has no open questions unless it is a draft`, async ({ page }) => {
		await page.goto(`/projects/${slug}`);
		const isDraft = await page.getByText("draft", { exact: true }).count();
		if (!isDraft) {
			await expect(page.getByText("Question for Nacho")).toHaveCount(0);
		}
	});
}

test("a project row opens its case study", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Extraction evals", exact: true }).click();
	await expect(page).toHaveURL(/\/projects\/extraction-evals$/);
	await expect(page.getByRole("heading", { level: 1, name: "Extraction evals" })).toBeVisible();
});

test("header links on a case study go back to home sections", async ({ page, viewport }) => {
	test.skip((viewport?.width ?? 0) < 640, "section links are hidden on phones");
	await page.goto("/projects/tardeo");
	await page.getByRole("link", { name: "Projects", exact: true }).click();
	await expect(page).toHaveURL(/\/#projects$/);
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
	// Focus goes back to the image that opened the viewer.
	await expect(opener).toBeFocused();
});

test("a single figure opens without arrows", async ({ page }) => {
	await page.goto("/projects/tardeo");
	await page.getByRole("button", { name: /^Open image: Dashboard funnel/ }).click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	await expect(page.getByRole("button", { name: "Next image" })).toHaveCount(0);
	await page.getByRole("button", { name: "Close image viewer" }).click();
	await expect(dialog).toBeHidden();
});

test("opening a case study from the home page starts at the top", async ({ page }) => {
	await page.goto("/");
	const card = page.getByRole("link", { name: "Tardeo.ai", exact: true }).first();
	await card.scrollIntoViewIfNeeded();
	await card.click();
	await expect(page).toHaveURL(/\/projects\/tardeo$/);
	await expect(page.getByRole("link", { name: /All work/ })).toBeInViewport();
	await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

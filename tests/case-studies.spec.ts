import { expect, test } from "@playwright/test";

test("an unknown case study returns 404", async ({ page }) => {
	const res = await page.goto("/projects/does-not-exist");
	expect(res?.status()).toBe(404);
});

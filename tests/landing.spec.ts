import { expect, test } from "@playwright/test";

test("every section renders and the nav links resolve", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Money, made calm.");
  for (const id of ["story", "card", "security", "reviews", "download"]) await expect(page.locator(`#${id}`)).toBeAttached();
  for (const href of ["#story", "#card", "#security", "#reviews"]) {
    await expect(page.getByRole("navigation", { name: "Main" }).locator(`a[href="${href}"]`)).toBeVisible();
  }
  await expect(page.getByText("Arta is a fictional product")).toBeVisible();
});

test("the story phone changes screen as you scroll", async ({ page }) => {
  await page.goto("/");
  const story = page.locator("#story");
  const { top, height } = await story.evaluate((el) => ({ top: (el as HTMLElement).offsetTop, height: (el as HTMLElement).offsetHeight }));
  const vh = await page.evaluate(() => innerHeight);
  const at = async (k: number) => { await page.evaluate((y) => window.scrollTo(0, y), top + (height - vh) * ((k + 0.5) / 3)); };
  await at(0);
  await expect(story.getByText("Know where every rupiah goes.")).toBeVisible();
  await expect(story.getByText("October spending")).toBeVisible();
  await at(1);
  await expect(story.getByText("Savings that happen on their own.")).toBeVisible();
  await expect(story.getByText("Auto-save Rp 50.000 every payday")).toBeVisible();
  await at(2);
  await expect(story.getByText("Split the bill in one tap.")).toBeVisible();
  await expect(story.getByRole("button", { name: "Remind Sinta & Bimo" })).toBeVisible();
  await expect(story.getByText("3/3")).toBeVisible();
});

test("the card tilts toward the cursor", async ({ page }) => {
  await page.goto("/#card");
  const wrapper = page.locator("#card [class*='perspective']").first();
  const card = wrapper.locator(":scope > div");
  await wrapper.scrollIntoViewIfNeeded();
  const box = (await wrapper.boundingBox())!;
  const transform = () => card.evaluate((el) => getComputedStyle(el).transform);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(600);
  const centered = await transform();
  await page.mouse.move(box.x + box.width * 0.95, box.y + box.height * 0.1);
  await expect.poll(transform, { timeout: 3000 }).not.toBe(centered);
});

test("mobile: menu works and nothing scrolls sideways", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const nav = page.getByRole("navigation", { name: "Mobile" });
  await nav.getByText("Security").click();
  await expect(nav).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
});

test("reduced motion: numbers are final and loops are still", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  for (const sel of [".animate-marquee", ".animate-aurora", ".text-shine"]) {
    expect(await page.locator(sel).first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  }
  await page.getByText("people using Arta").scrollIntoViewIfNeeded();
  await expect(page.getByText("2,4 jt")).toBeVisible({ timeout: 1000 });
  await context.close();
});

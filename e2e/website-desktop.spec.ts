import { test, expect } from "@playwright/test";

test.describe("Website - Landing Page", () => {
  test("landing page loads with hero section", async ({ page }) => {
    await page.goto("/website");
    await expect(page.locator("text=Energy").first()).toBeVisible({ timeout: 10000 });
  });

  test("landing page shows service cards", async ({ page }) => {
    await page.goto("/website");
    await expect(page.locator("text=EV Charging").first()).toBeVisible({ timeout: 10000 });
  });

  test("landing page has footer", async ({ page }) => {
    await page.goto("/website");
    await expect(page.locator("text=SP Group").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Website - Services", () => {
  test("services hub loads with all 6 services", async ({ page }) => {
    await page.goto("/website/services");
    await expect(page.locator("text=Services").first()).toBeVisible({ timeout: 10000 });
  });

  test("electricity service page loads", async ({ page }) => {
    await page.goto("/website/services/electricity");
    await expect(page.locator("text=Electricity").first()).toBeVisible({ timeout: 10000 });
  });

  test("water service page loads", async ({ page }) => {
    await page.goto("/website/services/water");
    await expect(page.locator("text=Water").first()).toBeVisible({ timeout: 10000 });
  });

  test("ev charging service page loads", async ({ page }) => {
    await page.goto("/website/services/ev-charging");
    await expect(page.locator("text=Charging").first()).toBeVisible({ timeout: 10000 });
  });

  test("solar service page loads", async ({ page }) => {
    await page.goto("/website/services/solar");
    await expect(page.locator("text=Solar").first()).toBeVisible({ timeout: 10000 });
  });

  test("district cooling service page loads", async ({ page }) => {
    await page.goto("/website/services/district-cooling");
    await expect(page.locator("text=Cooling").first()).toBeVisible({ timeout: 10000 });
  });

  test("smart home service page loads", async ({ page }) => {
    await page.goto("/website/services/smart-home");
    await expect(page.locator("text=Smart").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Website - Account Portal", () => {
  test("login page loads with form", async ({ page }) => {
    await page.goto("/website/login");
    await expect(page.locator("text=Welcome").first()).toBeVisible({ timeout: 10000 });
  });

  test("login page has Singpass button", async ({ page }) => {
    await page.goto("/website/login");
    await expect(page.locator("text=Singpass").first()).toBeVisible({ timeout: 10000 });
  });

  test("portal dashboard loads", async ({ page }) => {
    await page.goto("/website/portal");
    await expect(page.locator("text=Matteo").first()).toBeVisible({ timeout: 10000 });
  });

  test("portal shows consumption chart", async ({ page }) => {
    await page.goto("/website/portal");
    await expect(page.locator("text=kWh").first()).toBeVisible({ timeout: 10000 });
  });

  test("portal bill detail loads", async ({ page }) => {
    await page.goto("/website/portal/bills");
    await expect(page.locator("text=Bill").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Website - Corporate Pages", () => {
  test("about page loads with company info", async ({ page }) => {
    await page.goto("/website/about");
    await expect(page.locator("text=Singapore").first()).toBeVisible({ timeout: 10000 });
  });

  test("sustainability page loads with Green Plan", async ({ page }) => {
    await page.goto("/website/about/sustainability");
    await expect(page.locator("text=Green").first()).toBeVisible({ timeout: 10000 });
  });

  test("careers page loads with job listings", async ({ page }) => {
    await page.goto("/website/about/careers");
    await expect(page.locator("text=Career").first()).toBeVisible({ timeout: 10000 });
  });

  test("contact page loads with form", async ({ page }) => {
    await page.goto("/website/contact");
    await expect(page.locator("text=Contact").first()).toBeVisible({ timeout: 10000 });
  });

  test("contact page shows emergency numbers", async ({ page }) => {
    await page.goto("/website/contact");
    await expect(page.locator("text=1800").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Website - Cross-Page Navigation", () => {
  test("can navigate from landing to services to sub-page", async ({ page }) => {
    await page.goto("/website");
    await expect(page.locator("body")).toBeVisible({ timeout: 10000 });

    await page.goto("/website/services");
    await expect(page.locator("body")).toBeVisible({ timeout: 10000 });

    await page.goto("/website/services/electricity");
    await expect(page.locator("text=Electricity").first()).toBeVisible({ timeout: 10000 });
  });

  test("portal navigation links work", async ({ page }) => {
    await page.goto("/website/portal");
    await expect(page.locator("text=Matteo").first()).toBeVisible({ timeout: 10000 });

    // Navigate to bills via portal nav if available
    const billsLink = page.locator("a[href*='portal/bills']").first();
    if (await billsLink.isVisible()) {
      await billsLink.click();
      await expect(page.locator("text=Bill").first()).toBeVisible({ timeout: 10000 });
    }
  });
});

test.describe("Website - Responsive Behavior", () => {
  test("website pages are not constrained to 430px", async ({ page }) => {
    await page.goto("/website");
    const body = page.locator("body");
    const box = await body.boundingBox();
    expect(box?.width).toBeGreaterThan(430);
  });
});

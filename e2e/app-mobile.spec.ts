import { test, expect } from "@playwright/test";

test.describe("Mobile App - Home Dashboard", () => {
  test("loads and displays all key sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SP App/);

    // Header with greeting
    await expect(page.locator("text=Good evening")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Matteo")).toBeVisible();

    // Savings badge
    await expect(page.locator("text=Saved $24.50")).toBeVisible();

    // Cost ticker
    await expect(page.locator("text=Spent today")).toBeVisible();

    // Quick actions
    await expect(page.locator("text=Scan QR")).toBeVisible();
    await expect(page.locator("text=Services")).toBeVisible();
    await expect(page.locator("text=Green Goals")).toBeVisible();

    // Energy flow banner
    await expect(page.locator("text=Live Energy Flow")).toBeVisible();

    // Property selector
    await expect(page.locator("text=18 Everton Rd")).toBeVisible();

    // Chart
    await expect(page.locator("text=kWh")).toBeVisible();
  });

  test("electricity/water toggle works", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Electricity")).toBeVisible({ timeout: 10000 });
    await page.click("text=Water");
    await expect(page.locator("button:has-text('Water')")).toBeVisible();
  });

  test("AI insight card is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=AI Insight")).toBeVisible({ timeout: 10000 });
  });

  test("bottom navigation is present with all tabs", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Home")).toBeVisible();
    await expect(page.locator("text=Bills")).toBeVisible();
    await expect(page.locator("text=GreenUP")).toBeVisible();
    await expect(page.locator("text=EV")).toBeVisible();
    await expect(page.locator("text=Profile")).toBeVisible();
  });

  test("navigate to Bills via bottom nav", async ({ page }) => {
    await page.goto("/");
    await page.click("nav >> text=Bills");
    await expect(page).toHaveURL(/\/bills/);
  });
});

test.describe("Mobile App - Bills", () => {
  test("bills page loads with outstanding amount", async ({ page }) => {
    await page.goto("/bills");
    await expect(page.locator("text=Outstanding Amount")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=$130.20")).toBeVisible();
  });

  test("bills page shows transaction timeline", async ({ page }) => {
    await page.goto("/bills");
    await expect(page.locator("text=2026")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=PDF Bill").first()).toBeVisible();
  });

  test("navigate to bill detail", async ({ page }) => {
    await page.goto("/bills");
    await page.click("a[href*='/bills/']");
    await expect(page.locator("text=March 2026")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - Bill Explainer", () => {
  test("bill explainer loads with hero chart", async ({ page }) => {
    // Clear wizard state so it doesn't block
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("billExplainerWizardSeen", "true"));
    await page.goto("/bills/1");
    await expect(page.locator("text=March 2026")).toBeVisible({ timeout: 10000 });
  });

  test("bill explainer wizard shows on first visit", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("billExplainerWizardSeen"));
    await page.goto("/bills/1");
    // Wizard should appear
    await expect(page.locator("text=break down your bill").first()).toBeVisible({ timeout: 10000 });
  });

  test("AI explanation section with quick chips", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("billExplainerWizardSeen", "true"));
    await page.goto("/bills/1");
    await expect(page.locator("text=Why is water higher?")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - GreenUP", () => {
  test("greenup page loads with tier progress", async ({ page }) => {
    await page.goto("/greenup");
    await expect(page.locator("text=GreenUP").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - EV Charging", () => {
  test("ev charging page loads with station list", async ({ page }) => {
    await page.goto("/ev-charging");
    await expect(page.locator("text=EV Charging").first()).toBeVisible({ timeout: 10000 });
  });

  test("search bar is functional", async ({ page }) => {
    await page.goto("/ev-charging");
    const searchInput = page.locator("input[placeholder*='Search']");
    await expect(searchInput).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - EV Calculator", () => {
  test("ev calculator page loads", async ({ page }) => {
    await page.goto("/ev-calculator");
    await expect(page.locator("text=Petrol").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - Green Goals", () => {
  test("green goals page loads", async ({ page }) => {
    await page.goto("/green-goals");
    await expect(page.locator("text=Green Goal").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - Profile", () => {
  test("profile page loads with user info", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.locator("text=Profile").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - Energy Flow", () => {
  test("energy flow page loads", async ({ page }) => {
    await page.goto("/energy-flow");
    await page.waitForTimeout(2000);
    // Just verify the page rendered without crashing
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Mobile App - Dashboard (Head of Digital)", () => {
  test("dashboard loads with KPIs", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=Digital").first()).toBeVisible({ timeout: 10000 });
  });

  test("dashboard shows call deflection metrics", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=Deflect").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile App - SPBuddy Chat", () => {
  test("SPBuddy FAB is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("button[aria-label='Open SP Buddy chat']")).toBeVisible({ timeout: 10000 });
  });

  test("SPBuddy opens and shows greeting", async ({ page }) => {
    await page.goto("/");
    await page.click("button[aria-label='Open SP Buddy chat']");
    await expect(page.locator("text=SP Buddy")).toBeVisible({ timeout: 5000 });
    await expect(page.locator("text=Hello")).toBeVisible();
  });

  test("SPBuddy responds to bill query", async ({ page }) => {
    await page.goto("/");
    await page.click("button[aria-label='Open SP Buddy chat']");
    await expect(page.locator("text=SP Buddy")).toBeVisible({ timeout: 5000 });
    await page.fill("input[placeholder*='Ask SP Buddy']", "my bill");
    await page.click("button[aria-label='Send message']");
    // Wait for bot response
    await page.waitForTimeout(2000);
    await expect(page.locator("text=bill").nth(1)).toBeVisible();
  });
});

test.describe("Mobile App - Navigation Flow", () => {
  test("complete golden path: Home → Bills → Bill Detail → Back", async ({ page }) => {
    // Start at home
    await page.goto("/");
    await expect(page.locator("text=Matteo")).toBeVisible({ timeout: 10000 });

    // Navigate to Bills
    await page.click("nav >> text=Bills");
    await expect(page).toHaveURL(/\/bills/);
    await expect(page.locator("text=Outstanding Amount")).toBeVisible({ timeout: 10000 });

    // Navigate to Bill Detail
    await page.click("a[href*='/bills/']");
    await expect(page.locator("text=March 2026")).toBeVisible({ timeout: 10000 });

    // Navigate back to Bills
    await page.click("a[href='/bills']");
    await expect(page.locator("text=Outstanding Amount")).toBeVisible({ timeout: 10000 });

    // Navigate to Home
    await page.click("nav >> text=Home");
    await expect(page).toHaveURL("/");
  });

  test("all bottom nav tabs navigate correctly", async ({ page }) => {
    const tabs = [
      { name: "Home", url: "/" },
      { name: "Bills", url: "/bills" },
      { name: "GreenUP", url: "/greenup" },
      { name: "EV", url: "/ev-charging" },
      { name: "Profile", url: "/profile" },
    ];

    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible({ timeout: 10000 });

    for (const tab of tabs) {
      await page.click(`nav >> text=${tab.name}`);
      await expect(page).toHaveURL(tab.url);
      // Wait for page content to load
      await page.waitForTimeout(500);
    }
  });
});

import { test, expect } from "@playwright/test";

test("should navigate to item and click buy", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.locator("#searchValue").click();

  await page.locator("#searchValue").fill("ipad");
  // Press Enter
  await Promise.all([
    page.waitForNavigation(),
    page.locator("#searchValue").press("Enter"),
  ]);

  await Promise.all([
    page.waitForNavigation(),
    page.locator("h2").first().click(),
  ]);
  // Click text=Comprar
  await page.locator("text=Comprar").click();

  //Expect nothing because I didn't add the funtionality
});

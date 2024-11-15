import { expect, test } from "@playwright/test";
import { AllPages } from "../pages";

require("dotenv").config();

const adminUsername = "???"
const adminPassword = "???"

test.describe("Objednávka pro MŠ/ZŠ", () => {
  let pages: AllPages;

  test.beforeEach(async ({ page }) => {
    pages = new AllPages(page);
    await pages.visitPage();
  });

  test.describe("Zde piš testy ...", () => {

    test("nějaký test ...", async () => {

    });

  });

});

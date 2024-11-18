import { expect, test } from "@playwright/test";
import { AllPages } from "../pages";
import { SuburbanCampPage } from "../pages/new-order-page";

require("dotenv").config();

const dateNow = Date.now();
const ICO = "22834958";
const fullName = "Testerka " + dateNow;
const clientAddress = "Krakovská 583/9, Praha 1, 110 00";
const contactPhone = "123456789";
const contactEmail = "testerka." + dateNow + "@czechitas.cz";
const startDate = "10.12.2024";
const endDate = "20.12.2024";
const datePart = "Odpolední";
const childrenCount = "10";
const ageRange = "8-10";
const adultCount = "2";

const adminUsername = "da-app.admin@czechitas.cz";
const adminPassword = "Czechitas123";

test.describe("Objednaávka pro MŠ/ZŠ", () => {
  let pages: AllPages;

  test.beforeEach(async ({ page }) => {
    pages = new AllPages(page);
    await pages.visitPage();
  });

  test.describe("Navigace", () => {
    test("Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové objednávky pro MŠ/ZŠ", async () => {
      // await expect(pages.headerMenu.forTeacherMenuItem).toHaveText("Pro učitele");
      await pages.headerMenu.goToKindergartenAndSchoolSection();
      await expect(pages.newOrderPage.icoInput).toBeVisible();
      await expect(pages.newOrderPage.clientInput).toBeVisible();
      await expect(pages.newOrderPage.addressInput).toBeVisible();
      await expect(pages.newOrderPage.substituteInput).toBeVisible();
    });
  });

  test.describe("Vytvoření objednávky", () => {
    test.beforeEach(async () => {
      await pages.headerMenu.goToKindergartenAndSchoolSection();
    });

    test("Po vyplnění IČO do formuláře Objednávka pro MŠ/ZŠ se automaticky načte jméno odběratele a adresa odběratele z ARESu", async () => {
      await pages.newOrderPage.insertICO(ICO);
      await expect(pages.newOrderPage.clientInput).toHaveValue(fullName);
      await expect(pages.newOrderPage.addressInput).toHaveValue(clientAddress);
    });

    test("Uživatel nemůže uložit neúplnou přihlášku", async () => {
      await pages.newOrderPage.insertICO(ICO);
      await pages.newOrderPage.insertContact(
        fullName,
        contactPhone,
        contactEmail,
      );
      const suburbanCampPage =
        await pages.newOrderPage.selectSuburbanCampOption();
      await suburbanCampPage.fillValues(
        datePart,
        childrenCount,
        ageRange,
        adultCount,
      );
      await suburbanCampPage.submit();
      await expect(pages.newOrderPage.icoInput).toBeVisible();
    });

    test("Uživatel může uložit vyplněnou přihlášku na příměstský tábor", async () => {
      await test.step("Vyplnění základní objednávky", async () => {
        await pages.newOrderPage.insertICO(ICO);
        const toastMessage = await pages.newOrderPage.getToastMessage();
        if (
          toastMessage ==
          "Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně"
        ) {
          await pages.newOrderPage.insertClient(fullName, clientAddress);
          await pages.newOrderPage.insertSubstitute(fullName);
        }
        await pages.newOrderPage.insertContact(
          fullName,
          contactPhone,
          contactEmail,
        );
        await pages.newOrderPage.insertPreferredDates(startDate, endDate);
      });

      let suburbanCampPage: SuburbanCampPage;
      await test.step("Vyplnění příměstského tábora", async () => {
        suburbanCampPage = await pages.newOrderPage.selectSuburbanCampOption();
        await suburbanCampPage.fillValues(
          datePart,
          childrenCount,
          ageRange,
          adultCount,
        );
      });

      await test.step("Ověření potvrzení o uložení", async () => {
        const orderConfirmationPage = await suburbanCampPage.submit();
        await expect(pages.newOrderPage.toastMessage).toHaveText(
          "Objednávka byla úspěšně uložena",
        );
        await expect(orderConfirmationPage.header).toHaveText(
          "Děkujeme za objednávku",
        );
        await expect(orderConfirmationPage.text).toHaveText(
          "Objednávka byla úspěšně uložena a bude zpracována. O postupu vás budeme informovat. Zkontrolujte si také složku SPAM",
        );
      });

      await test.step("Ověření zobrazení objednávky v seznamu objednávek", async () => {
        await pages.loginPage.visit();
        await pages.loginPage.login(adminUsername, adminPassword);
        await pages.internalMenu.goToOrdersSection();
        await pages.ordersPage.search(fullName);
        const filteredRows = await pages.ordersPage.getTableRows();
        expect(filteredRows.length).toBe(1);
      });

      await test.step("Smazání objednávky", async () => {
        const rowsBeforeDelete = await pages.ordersPage.getTableRows();
        await rowsBeforeDelete[0].delete();
        const rowsAfterDelete = await pages.ordersPage.getTableRows();
        expect(await rowsAfterDelete[0].getRowText()).toEqual(
          "Žádné záznamy nebyly nalezeny",
        );
      });
    });
  });

  test.describe("Administrátor", () => {
    const fullName = "Monika Testová " + Date.now();

    test("Administrátor může smazat objednávku", async () => {
      await test.step("Vytvoření objednávky", async () => {
        await pages.headerMenu.goToKindergartenAndSchoolSection();
        await pages.newOrderPage.insertICO(ICO);
        await pages.newOrderPage.insertClient(fullName, clientAddress);
        await pages.newOrderPage.insertSubstitute(fullName);
        await pages.newOrderPage.insertContact(
          fullName,
          contactPhone,
          contactEmail,
        );
        await pages.newOrderPage.insertPreferredDates(startDate, endDate);
        const suburbanCampPage =
          await pages.newOrderPage.selectSuburbanCampOption();
        await suburbanCampPage.fillValues(
          datePart,
          childrenCount,
          ageRange,
          adultCount,
        );
        const orderConfirmationPage = await suburbanCampPage.submit();
        await expect(orderConfirmationPage.header).toHaveText(
          "Děkujeme za objednávku",
        );
      });

      await test.step("Smazání objednávky", async () => {
        await pages.loginPage.visit();
        await pages.loginPage.login(adminUsername, adminPassword);
        await pages.internalMenu.goToOrdersSection();
        await pages.ordersPage.search(fullName);
        const rowsBeforeDelete = await pages.ordersPage.getTableRows();
        expect(rowsBeforeDelete.length).toBeGreaterThan(0);
        await rowsBeforeDelete[0].delete();
        const rowsAfterDelete = await pages.ordersPage.getTableRows();
        expect(await rowsAfterDelete[0].getRowText()).toEqual(
          "Žádné záznamy nebyly nalezeny",
        );
      });
    });
  });
});

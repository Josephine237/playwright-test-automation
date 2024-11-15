import { type Page, type Locator } from "@playwright/test";

export class NewOrderPage {
  readonly page: Page;
  readonly suburbanCampTab: Locator;
  readonly schoolInNatureTab: Locator;
  readonly icoInput: Locator;
  readonly clientInput: Locator;
  readonly addressInput: Locator;
  readonly substituteInput: Locator;
  readonly contactNameInput: Locator;
  readonly contactPhoneInput: Locator;
  readonly contactEmailInput: Locator;
  readonly preferredStartDateInput: Locator;
  readonly preferredEndDateInput: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.suburbanCampTab = page.locator('#nav-home-tab');
    this.schoolInNatureTab = page.locator('#nav-profile-tab');
    this.icoInput = page.locator('#ico');
    this.clientInput = page.locator('#client');
    this.addressInput = page.locator('#address');
    this.substituteInput = page.locator('#substitute');
    this.contactNameInput = page.locator('#contact_name');
    this.contactPhoneInput = page.locator('#contact_tel');
    this.contactEmailInput = page.locator('#contact_mail');
    this.preferredStartDateInput = page.locator('#start_date_1');
    this.preferredEndDateInput = page.locator('#end_date_1');
    this.toastMessage = page.locator('.toast-message');
  }

  async selectSuburbanCampOption(): Promise<SuburbanCampPage> {
    await this.suburbanCampTab.click();
    return new SuburbanCampPage(this.page);
  }

  async selectSchoolInNatureOption(): Promise<SchoolInNaturePage> {
    await this.schoolInNatureTab.click();
    return new SchoolInNaturePage(this.page);
  }

  async insertICO(ico: string) {
    await this.icoInput.fill(ico);
    // Assuming that clicking the address field is required to trigger some UI update/validation.
    await this.addressInput.click();
    await this.page.waitForLoadState();
  }

  async insertClient(client: string, address: string) {
    await this.clientInput.fill(client);
    await this.addressInput.fill(address);
  }

  async insertSubstitute(substitute: string) {
    await this.substituteInput.fill(substitute);
  }

  async insertContact(fullName: string, phone: string, email: string) {
    await this.contactNameInput.fill(fullName);
    await this.contactPhoneInput.fill(phone);
    await this.contactEmailInput.fill(email);
  }

  async insertPreferredDates(startDate: string, endDate: string) {
    await this.preferredStartDateInput.fill(startDate);
    await this.preferredEndDateInput.fill(endDate);
  }

  async getToastMessage() {
    return this.toastMessage.textContent();
  }

}

export class SuburbanCampPage {
  readonly page: Page;
  readonly datePartSelector: Locator;
  readonly childrenCountInput: Locator;
  readonly ageInput: Locator;
  readonly adultsCountInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.datePartSelector = page.locator('#camp-date_part');
    this.childrenCountInput = page.locator('#camp-students');
    this.ageInput = page.locator('#camp-age');
    this.adultsCountInput = page.locator('#camp-adults');
    this.submitButton = page.locator('input[name="camp"]');
  }

  async fillValues(datePart: string, childrenCount: string, age: string, adultsCount: string) {
    // await this.datePartSelector.selectOption(datePart);
    await this.childrenCountInput.fill(childrenCount);
    await this.ageInput.fill(age.toString());
    await this.adultsCountInput.fill(adultsCount);
  }

  async submit(): Promise<NewOrdersConfirmationPage> {
    await this.submitButton.click();
    await this.page.waitForLoadState();
    return new NewOrdersConfirmationPage(this.page);
  }

}

export class SchoolInNaturePage {

  constructor(page: Page) {
    // implement
  }

}

export class NewOrdersConfirmationPage {
  readonly cardBody: Locator;
  readonly header: Locator;
  readonly text: Locator;

  constructor(page: Page) {
    this.cardBody = page.locator('.card-body');
    this.header = this.cardBody.locator('h3');
    this.text = this.cardBody.locator('p');
  }
}


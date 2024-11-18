import { Locator, Page } from "@playwright/test";

export class OrdersPage {
  private page: Page;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly tableLoadingIndicator: Locator;
  readonly nadpis: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[type="search"]');
    this.table = page.locator("#DataTables_Table_0");
    this.tableRows = this.table.locator("tbody").locator("tr");
    this.tableLoadingIndicator = page.locator("#DataTables_Table_0_processing");
    this.nadpis = page.locator("#h1");
  }

  async waitForTableToLoad() {
    await this.page.waitForLoadState();
    await this.tableLoadingIndicator.waitFor({ state: "hidden" });
  }

  async search(order: string) {
    await this.searchInput.fill(order);
    await this.tableLoadingIndicator.waitFor({ state: "visible" });
  }

  async getTableRows(): Promise<OrderData[]> {
    await this.waitForTableToLoad();
    const rows = await this.tableRows.all();
    return rows.map((row) => {
      return new OrderData(row);
    });
  }
}

export class OrderData {
  private row: Locator;
  readonly deleteIcon: Locator;
  readonly deleteOKButton: Locator;

  constructor(row: Locator) {
    this.row = row;
    this.deleteIcon = row.locator(".fa-trash");
    this.deleteOKButton = row.getByRole("button", { name: "Ano" });
  }

  async delete() {
    await this.deleteIcon.click();
    await this.deleteOKButton.click();
  }

  async getRowText() {
    return this.row.textContent();
  }
}

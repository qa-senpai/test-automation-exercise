import { Locator, Page } from "@playwright/test";

export class CookiesModal {
  private page: Page;
  private modalTitle: Locator;
  private acceptAllButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalTitle = this.page.locator(
      `[role='dialog'] [class ='uc-banner-title']`
    );
    this.acceptAllButton = this.page.locator(
      "//button[contains(@class, 'accept-all')]"
    );
  }

  async waitForModalVisibility() {
    await this.modalTitle.waitFor({ state: "visible" });
  }

  async acceptAllCookies() {
    await this.acceptAllButton.click();
  }
}

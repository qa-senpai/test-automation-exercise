import { Locator, Page } from '@playwright/test';

export class CookiesModal {

  rootLocator: Locator;
  modalTitle: Locator;
  acceptAllButton: Locator;

  constructor(rootLocator: Locator) {
    this.rootLocator = rootLocator;
    this.modalTitle = rootLocator.locator('[class ="uc-banner-title"]');
    this.acceptAllButton = rootLocator.locator('[class*="accept-all"]'); // контейнс синтаксис в css виглядає лаконічніше. субюєктивна думка)
  }

}

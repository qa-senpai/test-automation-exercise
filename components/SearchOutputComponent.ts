import { Page } from "@playwright/test";

export class SearchOutputComponent {
  private page: Page;
  private selectors: SearchOutputComponentSelectors;

  constructor(page: Page) {
    this.page = page;
    this.selectors = new SearchOutputComponentSelectors();
  }

  async getSearchOutputElementCount() {
    const locators = await this.page.locator(this.selectors.productTile).all();

    return locators.length;
  }
}

class SearchOutputComponentSelectors {
  productTile = `//*[@data-testid = 'product-tile']`;
}

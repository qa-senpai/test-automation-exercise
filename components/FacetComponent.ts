import { Page } from "@playwright/test";

export class FacetComponent {
  private page: Page;
  private selectors: FacetComponentSelectors;

  constructor(page: Page) {
    this.page = page;
    this.selectors = new FacetComponentSelectors();
  }

  async clickFacetPlateByTitle(title: string) {
    await this.page
      .locator(this.selectors.facetPlate(title))
      .click({ timeout: 10000 });
  }

  async clickFacetByTitle(title: string) {
    await this.page
      .locator(this.selectors.facetCheckbox(title))
      .click({ timeout: 10000 });
  }

  async clickCloseFacetList() {
    await this.page
      .locator(this.selectors.closeButton)
      .click({ timeout: 10000 });
  }

  async fillFacetSearch(text: string) {
    await this.page.locator(this.selectors.facetSearchInput).fill(text);
  }

  async getSearchVisibility() {
    return this.page
      .locator(this.selectors.facetSearchInput)
      .isVisible({ timeout: 10000 });
  }

  async getSelectedFacetButtonVisibility(facetTitle: string) {
    try {
      await this.page
        .locator(this.selectors.selectedFacetButton(facetTitle))
        .waitFor({ timeout: 5000, state: "visible" });
    } catch {}

    return this.page
      .locator(this.selectors.selectedFacetButton(facetTitle))
      .isVisible();
  }
}

class FacetComponentSelectors {
  private facetMenu = '//*[@class="facet__menu"]';

  facetPlate = (text: string) => {
    return `//*[contains(@class, 'facet-wrapper')]//*[@data-testid and text()='${text}']`;
  };

  facetCheckbox = (text: string) => {
    return (
      this.facetMenu +
      `//*[contains(@class, 'facet-option')]//*[starts-with(text(), '${text}')]`
    );
  };

  facetSearchInput = this.facetMenu + `//input[name="facet-search"]`;

  closeButton =
    this.facetMenu +
    `//*[@type = 'button' and contains(@class, 'close-button')]`;

  selectedFacetButton = (text: string) => {
    return `//*[@class = 'selected-facets']//button[text() = '${text}']`;
  };
}

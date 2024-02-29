import { Page } from "@playwright/test";
import { FacetComponent } from "../components/FacetComponent";
import { SearchOutputComponent } from "../components/SearchOutputComponent";

export class ParfumPage {
  private page: Page;
  private facetComponent: FacetComponent;
  private searchOutput: SearchOutputComponent;

  constructor(page: Page) {
    this.page = page;
    this.facetComponent = new FacetComponent(this.page);
    this.searchOutput = new SearchOutputComponent(this.page);
  }

  async navigateToParfumPage() {
    await this.page.goto("/c/parfum/01", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }

  async selectHighlights(value: string) {
    await this.facetComponent.clickFacetPlateByTitle("Highlights");

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      this.facetComponent.clickFacetByTitle(value),
    ]);

    await this.page.waitForTimeout(5000); //TODO: it`s a crutch, needs to be refactored
  }

  async selectFacet(facetTitle: string, value: string) {
    await this.facetComponent.clickFacetPlateByTitle(facetTitle);

    if (await this.facetComponent.getSearchVisibility()) {
      await this.facetComponent.fillFacetSearch(value);
    }

    await this.facetComponent.clickFacetByTitle(value);
    await this.facetComponent.clickCloseFacetList();
  }

  async selectFacets(facets: Object) {
    for (const facet in facets) {
      await this.selectFacet(facet, facets[facet]);
    }
  }

  async getFacetButtonVisibility(title: string) {
    return this.facetComponent.getSelectedFacetButtonVisibility(title);
  }

  async getProductTilesCount() {
    return this.searchOutput.getSearchOutputElementCount();
  }
}

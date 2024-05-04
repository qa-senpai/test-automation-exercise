import { Page, Locator } from '@playwright/test';
import { FacetComponent } from '@components';
import { CookiesModal } from '@modals';

export class ParfumPage {
  private page: Page;
  cookiesModal: CookiesModal;
  facetComponent: FacetComponent;
  selectedFacets: Locator;
  searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    // веб компоненти приймають свої рут селектори із сторінки де створюється композиція,
    // це дозволить інування доприкладу лістів компонентів з різними батьківськими селекторами чи перевизначення батьківських селлекторів на різних сторінках
    this.cookiesModal = new CookiesModal(this.page.getByRole('dialog'));
    this.facetComponent = new FacetComponent(this.page.locator('.facet-wrapper:not([class*=hidden])'));
    this.selectedFacets = this.page.locator('.selected-facets');
    this.searchResults = this.page.locator('[data-testid="product-tile"]')
  }

  async navigateToParfumPage() {
    await this.page.goto('/c/parfum/01', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  async selectFacetFromCategory(category: string, facet: string) {
    await this.facetComponent.plates.filter({ hasText: category }).click();
    await this.facetComponent.selectFacet(facet);
    await this.selectedFacets.getByText(facet).waitFor({ state: 'attached' });
  }

  async selectRandomFacetsFromCategory(category: string) {
    await this.facetComponent.plates.filter({ hasText: category }).click();
    const selectedFacetText = await this.facetComponent.selectRandomFacet();
    await this.selectedFacets.getByText(selectedFacetText).waitFor({ state: 'attached' }); // підозрюю це ця частина де ти чекав 5 секунд щоб фільтр перегрузив сторінку
    await this.facetComponent.plates.filter({ hasText: category }).click(); // close component
  }
}

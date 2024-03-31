import { $ } from 'playwright-elements';
import { facetComponent } from '@components';

export class ParfumPage {
  // playwright-elements спрощує написання пейдж обджекту прибираючи потребу ініціалізувати в конструкторі задекларовані вище змінні
  facetComponent = facetComponent;
  selectedFacets = $('.selected-facets');
  searchResults = $('[data-testid="product-tile"]');

  async selectFacetFromCategory(category: string, facet: string) {
    await this.facetComponent.plates.filter({ hasText: category }).click();
    await this.facetComponent.options.selectFacet(facet);
    await this.selectedFacets.$getByText(facet).waitFor({ state: 'attached' });
  }

  async selectRandomFacetsFromCategory(category: string) {
    await this.facetComponent.plates.filter({ hasText: category }).click();
    const selectedFacetText = await this.facetComponent.options.selectRandomFacet();
    await this.selectedFacets.$getByText(selectedFacetText).waitFor({ state: 'attached' }); // підозрюю це ця частина де ти чекав 5 секунд щоб фільтр перегрузив сторінку
    await this.facetComponent.plates.filter({ hasText: category }).click(); // close component
  }
}

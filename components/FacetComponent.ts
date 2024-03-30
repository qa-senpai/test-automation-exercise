import { Locator } from '@playwright/test';

// компонент це не сторінка і не повинна залежати від сторінки.
// також можна не тримати селектори у стрінгах у більшості випадків
export class FacetComponent {
  private rootLocator: Locator;
  facetMenu: Locator;
  search: Locator;
  options: Locator;
  plates: Locator;

  constructor(rootLocator: Locator) {
    this.rootLocator = rootLocator;
    this.facetMenu = this.rootLocator.locator('[class=facet__menu]');
    this.search = this.rootLocator.locator('[name=facet-search]')
    this.options = this.rootLocator.locator('[role="checkbox"].facet-option');
    this.plates = this.rootLocator.locator('[class*="title"][data-testid]');
  }

  // ті всі методи з одним рядком коду які в кінці роблять клік ))
  // є сенс обгортати тільки методи з логікю інакше в реальному ентерпрайз проекті з тисячами тастів ти втонеш в тих маленьких методах які не приносять велю твоїй структурі

  async selectFacet(facet: string) {
    const target = this.options.filter({ hasText: new RegExp(`^${facet}$`) }); // регепс бо за замовчуванням воно як контейнс працює
    await target.scrollIntoViewIfNeeded();
    await target.locator('.facet-option__checkbox.facet-option__checkbox').click();
  }

  async selectRandomFacet(): Promise<string> {
    await this.options.last().waitFor();
    const count = await this.options.count();
    const targetFacetText = await this.options.nth(Math.floor(Math.random() * (count - 1))).textContent() ?? '';
    await this.selectFacet(targetFacetText)
    return targetFacetText;
  }

}
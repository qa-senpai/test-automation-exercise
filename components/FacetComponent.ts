import { $, WebElement } from 'playwright-elements';

// playwright-elements допомагає відобразити деревоподібну струкруту веб компоненту де кожен може мати багато нащадків і всі елементи дерева портують апі Locator
// кожен елемент може повернути ланцюжок локаторів facetComponent.facetMenu.locator or facetComponent.facetMenu._ поверне вам page.locator('.facet-wrapper:not([class*=hidden])').locator('[name=facet-search]')
// але при тому зберігає варіативність в чейнінгу.
export const facetComponent = $('.facet-wrapper:not([class*=hidden])')
    .with({
      facetMenu: $('[class=facet__menu]'),
      search: $('[name=facet-search]'),
      options: $('[role="checkbox"].facet-option')
          .with({
            checkbox: $('.facet-option__checkbox.facet-option__checkbox'), // раніше цей чекбокс був зашитий в методі бо інакше неможливо було його зачейнити після фільтру
            // таке використання this зветься fake this
            async selectFacet(this: WebElement & { checkbox: WebElement  }, facet: string) {
                const target = this.filter({ hasText: new RegExp(`^${facet}$`) });
                await target.scrollIntoViewIfNeeded();
                // тепер повноцінна деревоподібна структура дозвоняє спершу відфільтрувати ліст і потім викликати необхідного чаєлд елемента для взаєжмодії
                await target.checkbox.click();
            },
            async selectRandomFacet(this: WebElement & { selectFacet: (text: string) => Promise<void>}): Promise<string> {
                await this.last().waitFor();
                const targetFacetText = await this.nth(Math.floor(Math.random() * (await this.count() - 1))).textContent() ?? '';
                await this.selectFacet(targetFacetText);
                return targetFacetText;
            }
          }),
      plates: $('[class*="title"][data-testid]'),
    });
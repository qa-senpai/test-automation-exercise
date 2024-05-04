import { expect } from '@playwright/test';
import { test } from '@fixtures'; // відносних шляхів в імпортах иути не повинно. Рішення path tsconfig

// схоже що дата провайдер не відповідав таблиці прийняття рішень в рідмі) тож я переписав
// це така техніка дизайну тестів для визначення всіх позитивних і негативних бізнес фловів https://testsigma.com/blog/decision-table-testing
// ? Means any value could be plugged in - тобто тут не треба хардкодити.
const testData = [
  {
    highlightsCriteria: 'Sale',
    category: 'Marke'
  },
  {
    highlightsCriteria: 'Sale',
    category: 'Produktart'
  },
  {
    highlightsCriteria: 'Sale',
    category: 'Für Wen'
  },
  {
    highlightsCriteria: 'NEU',
    category: 'Produktart'
  },
  {
    highlightsCriteria: 'NEU',
    category: 'Für Wen'
  },
  {
    highlightsCriteria: 'Limitiert',
    category: 'Marke'
  },
  {
    highlightsCriteria: 'Limitiert',
    category: 'Produktart'
  },
  {
    highlightsCriteria: 'Limitiert',
    category: 'Geschenk für'
  },
  {
    highlightsCriteria: 'Limitiert',
    category: 'Für Wen'
  },
];

for (const { highlightsCriteria, category } of testData) {
  test(`Verify if facet from category ${category} can be combined with criteria ${highlightsCriteria} in category Highlights`, async ({ parfumPage }) => {
    await parfumPage.selectRandomFacetsFromCategory(category);
    await parfumPage.selectFacetFromCategory('Highlights', highlightsCriteria);

    expect.poll(async () => await parfumPage.searchResults.count()).toBeGreaterThan(0);
  })

}

// і ще один провайдер щоб покрити іншу частину таблиці прийняття рішень: -Means criteria is not applicable

const testDataNegative = [
  {
    highlightsCriteria: 'Sale',
    category: 'Geschenk für'
  },
  {
    highlightsCriteria: 'NEU',
    category: 'Geschenk für'
  },
  {
    highlightsCriteria: 'NEU',
    category: 'Marke'
  },
];

for (const { highlightsCriteria, category } of testDataNegative) {
  test(`Verify if criteria ${highlightsCriteria} is not applicable when ${category} selected`, async ({ parfumPage }) => {
    await parfumPage.selectRandomFacetsFromCategory(category);

    await expect(parfumPage.facetComponent.plates.filter({ hasText: 'Highlights' }), 'Plate Highlights should not disappear').toBeVisible();
    await parfumPage.facetComponent.plates.filter({ hasText: 'Highlights' }).click();

    await expect(parfumPage.facetComponent.options, `List of facets should not contain ${highlightsCriteria}`).not.toHaveText([highlightsCriteria]);
  })

}
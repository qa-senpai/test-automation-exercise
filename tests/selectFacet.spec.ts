import { expect } from "@playwright/test";
import { test } from "../fixtures/baseFixture";

const testData = [
  {
    Highlights: "Sale",
    facets: {
      Marke: "Betty Barclay",
      Produktart: "Deodorant ",
      "Für Wen": "Weiblich",
    },
  },
  {
    Highlights: "NEU",
    facets: {
      Produktart: "Parfum",
      "Für Wen": "Unisex",
    },
  },
  {
    Highlights: "Limitiert",
    facets: {
      Marke: "Alyssa Ashley",
      Produktart: "Duftset",
      "Geschenk für": "Geburtstag",
      "Für Wen": "Unisex",
    },
  },
];

for (const { Highlights, facets } of testData) {
  test(`select facet by category ${Highlights}`, async ({ parfumPage }) => {
    await parfumPage.selectHighlights(Highlights);
    await parfumPage.selectFacets(facets);

    expect(await parfumPage.getProductTilesCount()).toBeGreaterThanOrEqual(1);
  });
}

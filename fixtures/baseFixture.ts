import { test as base } from "@playwright/test";
import { ParfumPage } from "../pages/ParfumPage";
import { CookiesModal } from "../modals/AcceptCookiesModal";

type Fixture = {
  parfumPage: ParfumPage;
};

export const test = base.extend<Fixture>({
  page: async ({ page }, use) => {
    const parfumPage = new ParfumPage(page);
    const cookiesModal = new CookiesModal(page);

    await parfumPage.navigateToParfumPage();
    await cookiesModal.waitForModalVisibility();
    await cookiesModal.acceptAllCookies();

    await use(page);
  },
  parfumPage: async ({ page }, use) => {
    const parfumPage = new ParfumPage(page);

    await use(parfumPage);
  },
});

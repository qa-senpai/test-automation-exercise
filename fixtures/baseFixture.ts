import { test as base } from '@playwright/test';
import { ParfumPage } from '@page.object';

type Fixture = {
  parfumPage: ParfumPage;
};

export const test = base.extend<Fixture>({
  // не потрібно перевизначати фікстуру пейдж бо це повпливає на поведінку у всіх тестах навіть де ця пейджа може не бути потрібною.
  parfumPage: async ({ page }, use) => {
    const parfumPage = new ParfumPage(page);
    await parfumPage.navigateToParfumPage();
    await use(parfumPage);
  },
});

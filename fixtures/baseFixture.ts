import { test as base } from 'playwright-elements';
import { ParfumPage } from '@page.object';

type Fixture = {
  parfumPage: ParfumPage;
};

export const test = base.extend<Fixture>({
  // playwright-elements
  parfumPage: async ({ goto }, use) => {
    await goto('/c/parfum/01', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await use(new ParfumPage());
  },
});

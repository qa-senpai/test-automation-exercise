import { BrowserInstance, BrowserName } from 'playwright-elements';
import { baseUrl, sessionJsonPath } from '@test.data';
import { cookiesModal } from '@modals';

// зверніть увагу що немає потреби зберігати інстанс браузера чи пейджу в змінні.
// це доречі ніяк не вприває на здатність фреймворку до паралельного виконання тестів чи виконання коду в різних контекстах паралельно в промісах...
export default async function globalSetup() {
    await BrowserInstance.start(BrowserName.CHROMIUM);
    await BrowserInstance.startNewPage();
    await BrowserInstance.currentPage.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await cookiesModal.modalTitle.waitFor();
    await cookiesModal.acceptAllButton.click();
    await cookiesModal.waitFor({ state: 'hidden' });
    await BrowserInstance.currentContext.storageState({ path: sessionJsonPath });
    await BrowserInstance.close();
}
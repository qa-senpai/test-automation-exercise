import { chromium } from '@playwright/test';
import { baseUrl, sessionJsonPath } from '@test.data';
import {CookiesModal} from "@modals";

export default async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded'});
    const cookiesModal = new CookiesModal(page.getByRole('dialog'));
    await cookiesModal.modalTitle.waitFor(); // візібіліті де дефолтний кондишн для ветйту не потребує обгортки
    await cookiesModal.acceptAllButton.click(); // немає сенсу інкапсулювати дефолтні методи для одиночних елементів
    await cookiesModal.rootLocator.waitFor({ state: 'hidden' });
    await page.context().storageState({ path: sessionJsonPath }); // щоб не прийшлось закривати вікно з кукі в кожному тесті.
    await browser.close();
}
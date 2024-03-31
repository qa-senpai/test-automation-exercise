import { $, $getByRole } from 'playwright-elements';

// веб елементи можуть бути оголошені як поле класу так і як незалежний обєкт що надає більшу гнучкість у ваших композиціях
export const cookiesModal = $getByRole('dialog')
    .with({
      modalTitle: $('[class ="uc-banner-title"]'),
      acceptAllButton: $('[class*="accept-all"]')
    });

import { test, expect } from '@playwright/test';
import { TelenorHomePage } from '../pages/telenor-home.page';
import { TelenorBroadbandShopPage } from '../pages/telenor-broadband-shop.page';
import { rejectAllCookiesIfCookiePopupIsVisible } from '../common-functions/cookies';
import { kungsgatan103UppsalaBroadbandAddressTestData } from '../test-data/address.data';

test('Featured product grid is not empty after searching an address', async ({ page: browserPage }) => {
  const telenorHomePage = new TelenorHomePage(browserPage);
  const telenorBroadbandShopPage = new TelenorBroadbandShopPage(browserPage);

  await test.step('1. Open telenor.se home page', async () => {
    await telenorHomePage.openTelenorHomePage();
    await rejectAllCookiesIfCookiePopupIsVisible(browserPage);
  });

  await test.step('2. Click Bredband in the header top menu (there is no Handla button)', async () => {
    await telenorHomePage.clickBredbandItemInTheHeaderTopMenu();
    await expect(telenorHomePage.headerMenuBredbandViaFiberShopLink).toBeVisible();
  });

  await test.step('3. Click Bredband via fiber in the header menu', async () => {
    await telenorHomePage.clickBredbandViaFiberLinkInTheHeaderMenu();
    await rejectAllCookiesIfCookiePopupIsVisible(browserPage);
    await expect(browserPage).toHaveURL(/handla\/bredband/);
  });

  await test.step(`4. Enter address: ${kungsgatan103UppsalaBroadbandAddressTestData.customerSearchAddress}`, async () => {
    await telenorBroadbandShopPage.enterAddressInSearchBoxAndSelectMatchingSuggestion(
      kungsgatan103UppsalaBroadbandAddressTestData.customerSearchAddress,
    );
  });

  await test.step('5. Check that the featured product grid is not empty', async () => {
    await expect(telenorBroadbandShopPage.featuredFixedProductGridItemContainer).toBeVisible();
    await expect(telenorBroadbandShopPage.featuredProductGridItemCardsInTheContainer).not.toHaveCount(0);
  });
});

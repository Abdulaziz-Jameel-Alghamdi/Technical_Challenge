export class TelenorHomePage {
  constructor(browserPage) {
    this.browserPage = browserPage;
    // there are two "bredband" items. i take the first one, which is in the top menu.
    this.headerTopMenuBredbandMenuItem = browserPage.getByTestId('Bredband').first();
    // this link opens the broadband shop page with the address search.
    this.headerMenuBredbandViaFiberShopLink = browserPage.locator('header').getByRole('link', { name: 'Bredband via fiber' });
  }

  async openTelenorHomePage() {
    await this.browserPage.goto('/');
  }

  // the task says click "handla", but the website has no handla button now.
  // i click "bredband" in the top menu instead.
  async clickBredbandItemInTheHeaderTopMenu() {
    await this.headerTopMenuBredbandMenuItem.click();
  }

  async clickBredbandViaFiberLinkInTheHeaderMenu() {
    await this.headerMenuBredbandViaFiberShopLink.click();
  }
}

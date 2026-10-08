export class TelenorBroadbandShopPage {
  constructor(browserPage) {
    this.browserPage = browserPage;
    this.searchAddressComboboxInput = browserPage.getByRole('combobox', { name: 'Sök adress' });
    // the task says "featured-product-grid". on the website the names are a bit different:
    // the box is featured-fixed-product-grid-item-container
    // each product card is featured-product-grid-item
    this.featuredFixedProductGridItemContainer = browserPage.getByTestId('featured-fixed-product-grid-item-container');
    this.featuredProductGridItemCardsInTheContainer = this.featuredFixedProductGridItemContainer.getByTestId('featured-product-grid-item');
  }

  addressSuggestionOptionFromTheDropdownList(customerSearchAddress) {
    return this.browserPage.getByRole('option', { name: customerSearchAddress });
  }

  async enterAddressInSearchBoxAndSelectMatchingSuggestion(customerSearchAddress) {
    await this.searchAddressComboboxInput.fill(customerSearchAddress);
    // after typing, a list of addresses is shown. i click the matching one.
    await this.addressSuggestionOptionFromTheDropdownList(customerSearchAddress).click();
  }
}

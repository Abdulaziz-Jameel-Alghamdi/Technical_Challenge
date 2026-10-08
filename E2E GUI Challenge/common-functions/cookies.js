// the website shows a cookie popup i click reject all if i see it
export async function rejectAllCookiesIfCookiePopupIsVisible(browserPage) {
  const oneTrustRejectAllCookiesButton = browserPage.locator('#onetrust-reject-all-handler');

  try {
    await oneTrustRejectAllCookiesButton.waitFor({ state: 'visible', timeout: 5000 });
    await oneTrustRejectAllCookiesButton.click();
  } catch {
    
  }
}

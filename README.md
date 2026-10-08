how to run the test

you need nodejs installed

cd "e2e gui challenge"
npm install
npx playwright install chromium
npm test

to see the browser

npm run test:headed

how to see the allure report

on my laptop

after the test

cd "e2e gui challenge"
npm run allure:generate
npm run allure:open

from github actions download

i used ai to help me write this part (github actions)
this is the first time i used github actions
it is very useful and i want to learn more about it on bigger projects

1 open the repo on github
2 click actions
3 open the latest run
4 download the allure-report file
5 unzip it and open index.html

assumptions regarding the task e2e gui

1 there is no handla button on the website now
i checked the home page
i did not find handla
the shop pages still use /handla/ in the url
so i click bredband in the top menu then bredband via fiber
that opens the page with the address search
i used exploratory testing to find this

2 i click bredband via fiber not the bredband info page
bredband via fiber opens the shop page with the address box
the other bredband link opens an info page with no address box

3 featured-product-grid is not empty means at least one product card is shown
the website does not use the exact name featured-product-grid
after the address search i see
data-test="featured-fixed-product-grid-item-container"
data-test="featured-product-grid-item" on each card
i check that the container is visible and that the number of cards is not 0
for this address fiber is not available but a 5g product is shown
i count that as not empty

4 a cookie popup can show up
i click reject all if i see the popup

5 i must select the address from the list
typing is not enough
i click the matching suggestion





resources i used

playwright locators
https://playwright.dev/docs/locators
i used this to write getbyrole and getbytestid

playwright test id
https://playwright.dev/docs/locators#locate-by-test-id
telenor uses data-test not data-testid
i set this in playwright.config.js

playwright github actions
https://playwright.dev/docs/ci#github-actions
i used this for the workflow file

allure-playwright
https://www.npmjs.com/package/allure-playwright
this creates allure results when the test runs

allure github pages
https://allurereport.org/docs/guides/github-pages/
i used this to publish the report

peaceiris/actions-gh-pages
https://github.com/peaceiris/actions-gh-pages
this action uploads the report to the gh-pages branch

github upload-artifact
https://github.com/actions/upload-artifact
this saves the report so i can download it





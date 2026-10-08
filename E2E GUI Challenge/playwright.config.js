import { defineConfig, devices } from '@playwright/test';

// npm run test:headed opens the browser so i can watch the test.
// on my windows pc playwright chrome is blocked, so headed mode uses edge.
const headed = process.env.npm_lifecycle_event === 'test:headed';

export default defineConfig({
  testDir: './tests',
  // playwright default is *.spec.js. my test file is featured-product-grid.js
  testMatch: '*.js',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  forbidOnly: !!process.env.CI,
  // one retry in github actions, in case the live website is slow.
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],

  use: {
    baseURL: 'https://telenor.se',
    // telenor uses data-test. playwright default is data-testid.
    testIdAttribute: 'data-test',
    locale: 'sv-SE',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(headed && process.platform === 'win32' ? { channel: 'msedge' } : {}),
        launchOptions: {
          slowMo: headed ? 600 : 0,
        },
      },
    },
  ],
});

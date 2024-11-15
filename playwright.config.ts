import { defineConfig, devices } from "@playwright/test";

require('dotenv').config({
  /* Add a variable (e.g. via ${process.env.ENV}) to path to distinguish between environments we running our tests against */
  path: './env/.env',
});

const { BASE_URL } = process.env;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Examples",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "example-czechitas.spec.ts",
    },

    {
      name: "Template",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "template.spec.ts",
    },

    {
      name: "Password",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "forgot-password.spec.ts",
    },

    {
      name: "Registration",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "registration.spec.ts",
    },

    {
      name: "New Order",
      use: { ...devices["Desktop Chrome"] },
      testMatch: "new-order.spec.ts",
    },
  ],
});

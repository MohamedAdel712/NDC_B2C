import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    headless: false,
    viewport: null,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    launchOptions: {
      args: ["--start-maximized"],
    },

    baseURL: "https://ndc-b2c-frontend-stg-app.azurewebsites.net/en",
  },
});

// git add .
// git commit -m "update"
// git push

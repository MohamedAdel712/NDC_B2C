import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,

  reporter: [
    ["list"],
    ["allure-playwright", { outputFolder: "allure-results", detail: true }],
  ],

  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://ndc-b2c-frontend-stg-app.azurewebsites.net/en",
  },

  projects: [
    // 💻 Desktop
    {
      name: "Desktop Chrome",
      use: {
        browserName: "chromium",
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    //📱 iPhone
    // {
    //   name: "iPhone 15 Pro Max",
    //   use: {
    //     ...devices["iPhone 15 Pro Max"],
    //   },
    // },

    // 📱 Android
    // {
    //   name: "Pixel 5",
    //   use: {
    //     ...devices["Pixel 5"],
    //   },
    // },
  ],
});

// git add .
// git commit -m "update"
// git push

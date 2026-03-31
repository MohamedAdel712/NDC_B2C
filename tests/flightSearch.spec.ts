import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import flightData from "../test-data/flightData.json";
test.describe("Flight Search", () => {


  test("FLYWT logo is visible", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.FLYWTLogo();
  });



  test("Home button navigates to homepage", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.HomeButton();
    await expect(page).toHaveURL(
      "https://ndc-b2c-frontend-stg-app.azurewebsites.net/en",
    );
  });


  test("Currency dropdown selects correct currency", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.selectCurrency(flightData.currency);
  });


  test("User can select trip type", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.selectTripType("One Way");
    await expect(page.getByRole("combobox", { name: "One Way" })).toHaveText(
      "One Way",
    );
  });


  test("User can select passengers", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.openPassengerDropdown();
    await searchPage.incrementPassenger("Adults", flightData.Adults);
    await searchPage.incrementPassenger("Children", flightData.Children);
    await searchPage.incrementPassenger("Infants", flightData.Infants);
    await searchPage.applyPassengerSelection();
  });


  test("User can select cabin class", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.selectCabinClass(flightData.class);
  });


  test("User can select origin and destination", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.selectFrom(flightData.from);
    await searchPage.selectTo(flightData.to);
  });


  test.only("User can select date", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.setDateFromToday(+flightData.date);
  });


  test.only("User can search flight successfully", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.selectCurrency(flightData.currency);
    await searchPage.selectTripType("One Way");
    await searchPage.openPassengerDropdown();
    await searchPage.incrementPassenger("Adults", flightData.Adults);
    await searchPage.incrementPassenger("Children", flightData.Children);
    await searchPage.incrementPassenger("Infants", flightData.Infants);
    await searchPage.applyPassengerSelection();
    await searchPage.selectCabinClass(flightData.class);
    await searchPage.selectFrom(flightData.from);
    await searchPage.selectTo(flightData.to);
    await searchPage.setDateFromToday(+flightData.date);
    await searchPage.search();
    await expect(page).toHaveURL(
      "https://ndc-b2c-frontend-stg-app.azurewebsites.net/en/booking/search?tripType=1&cabinClass=3&adults=3&children=2&infants=3&origin=CAI&destination=DXB&departureDate=2026-03-28",
    );
  });
});

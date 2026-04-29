import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/Search_Page";
import SearchData from "../test-data/SearchData.json";
import OneWay_data from "../test-data/OneWay_data.json";
import RoundTrip_data from "../test-data/RoundTrip_data.json";
import MultiCity_data from "../test-data/Multicity_data.json";
import { ENV } from "../config/env";
import { SearchData as SearchDataType } from "../types/search.types";

type TripType = "One Way" | "Round Trip" | "Multi-City";

test.describe("Flight Search", () => {
  test("FLYWT logo is visible", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await expect(page.getByAltText("Home")).toBeVisible();

    await searchPage.clickMyBooking();
    await searchPage.FLYWTLogo();

    await expect(page).toHaveURL(ENV.BASE_URL);
  });

  test("click on my booking", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.clickMyBooking();
  });

  test("Home button navigates to homepage", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.HomeButton();
    await expect(page).toHaveURL(/\/en$/);
    await searchPage.clickMyBooking();
    await searchPage.HomeButton();
    await expect(page).toHaveURL(ENV.BASE_URL);
  });

  test("Currency dropdown selects correct currency", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.selectCurrency(SearchData.currency);

    await expect(page.locator("body")).toContainText(SearchData.currency);
  });

  test("User can select trip type", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = SearchData.tripType as TripType;
    await searchPage.selectTripType(tripType);

    await expect(page.locator("body")).toContainText(tripType);
  });

  test("User can select passengers", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.openPassengerDropdown();
    await searchPage.incrementPassenger("Adults", SearchData.Adults);
    await searchPage.incrementPassenger("Children", SearchData.Children);
    await searchPage.incrementPassenger("Infants", SearchData.Infants);
    await searchPage.applyPassengerSelection();

    const totalPassengers =
      SearchData.Adults + SearchData.Children + SearchData.Infants;

    const labelText =
      totalPassengers === 1
        ? `${totalPassengers} Passenger`
        : `${totalPassengers} Passengers`;

    await expect(page.locator(".passenger-btn-label")).toHaveText(labelText);
  });

  test("User can select cabin class", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.selectCabinClass(SearchData.class);

    const cabinDropdown = page.locator(
      'app-base-dropdown[label="Cabin class"] span[role="combobox"]',
    );

    await expect(cabinDropdown).toContainText(SearchData.class);
  });

  test("User can fill origin, destination and dates", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = SearchData.tripType as TripType;

    if (tripType === "One Way") {
      await searchPage.fillOneWay(
        SearchData.from,
        SearchData.to,
        SearchData.departDate,
      );

      await expect(searchPage.txt_fromInput).toHaveValue(SearchData.from);
      await expect(searchPage.txt_toInput).toHaveValue(SearchData.to);
    }

    if (tripType === "Round Trip") {
      await searchPage.fillRoundTrip(
        SearchData.from,
        SearchData.to,
        SearchData.departDate,
        SearchData.returnDate,
      );
    }

    if (tripType === "Multi-City") {
      await searchPage.fillMultiCity(SearchData.legs);

      const fromInputs = page.getByPlaceholder("Departure City");
      await expect(fromInputs).toHaveCount(SearchData.legs.length);
    }
  });

  test("Search_oneWay", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.search(OneWay_data as SearchDataType);
  });

  test("Search_roundTrip", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.search(RoundTrip_data as SearchDataType);
  });

  test.only("Search_multiCity", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.search(MultiCity_data as SearchDataType);
  });
});

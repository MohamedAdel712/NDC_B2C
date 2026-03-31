import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import flightData from "../test-data/flightData.json";

type TripType = "One Way" | "Round Trip" | "Multi-City";

test.describe("Flight Search", () => {

  test("FLYWT logo is visible", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await expect(page.getByAltText("Home")).toBeVisible();
  });

  test("Home button navigates to homepage", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.HomeButton();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("Currency dropdown selects correct currency", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.selectCurrency(flightData.currency);

    
    await expect(page.locator("body")).toContainText(flightData.currency);
  });

  test("User can select trip type", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = flightData.tripType as TripType;
    await searchPage.selectTripType(tripType);

    await expect(page.locator("body")).toContainText(tripType);
  });

  test("User can select passengers", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.openPassengerDropdown();
    await searchPage.incrementPassenger("Adults", flightData.Adults);
    await searchPage.incrementPassenger("Children", flightData.Children);
    await searchPage.incrementPassenger("Infants", flightData.Infants);
    await searchPage.applyPassengerSelection();

    const totalPassengers =
      flightData.Adults + flightData.Children + flightData.Infants;

    const labelText =
      totalPassengers === 1
        ? `${totalPassengers} Passenger`
        : `${totalPassengers} Passengers`;

    await expect(page.locator(".passenger-btn-label")).toHaveText(labelText);
  });

  test("User can select cabin class", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.selectCabinClass(flightData.class);

    const cabinDropdown = page.locator(
      'app-base-dropdown[label="Cabin class"] span[role="combobox"]'
    );

    await expect(cabinDropdown).toContainText(flightData.class);
  });

  test("User can fill origin, destination and dates", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = flightData.tripType as TripType;

    if (tripType === "One Way") {
      await searchPage.fillOneWay(
        flightData.from,
        flightData.to,
        flightData.departDate
      );

      await expect(searchPage.fromInput).toHaveValue(flightData.from);
      await expect(searchPage.toInput).toHaveValue(flightData.to);
    }

    if (tripType === "Round Trip") {
      await searchPage.fillRoundTrip(
        flightData.from,
        flightData.to,
        flightData.departDate,
        flightData.returnDate
      );
    }

    if (tripType === "Multi-City") {
      await searchPage.fillMultiCity(flightData.legs);

      const fromInputs = page.getByPlaceholder("Departure City");
      await expect(fromInputs).toHaveCount(flightData.legs.length);
    }
  });

  test.only("User can search flight successfully", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = flightData.tripType as TripType;

    // Currency
    await searchPage.selectCurrency(flightData.currency);

    // Trip Type
    await searchPage.selectTripType(tripType);

    // Passengers
    await searchPage.openPassengerDropdown();
    await searchPage.incrementPassenger("Adults", flightData.Adults);
    await searchPage.incrementPassenger("Children", flightData.Children);
    await searchPage.incrementPassenger("Infants", flightData.Infants);
    await searchPage.applyPassengerSelection();

    // Cabin
    await searchPage.selectCabinClass(flightData.class);

    // Actions (FIXED)
    const actions: Record<TripType, () => Promise<void>> = {
      "One Way": () =>
        searchPage.fillOneWay(
          flightData.from,
          flightData.to,
          flightData.departDate
        ),

      "Round Trip": () =>
        searchPage.fillRoundTrip(
          flightData.from,
          flightData.to,
          flightData.departDate,
          flightData.returnDate
        ),

      "Multi-City": () =>
        searchPage.fillMultiCity(flightData.legs),
    };

    await actions[tripType]();

    // Search
    await searchPage.search();

    // Assertions
    await expect(page).toHaveURL(/booking\/search\?/);

    if (tripType !== "Multi-City") {
      await expect(page).toHaveURL(
        new RegExp(`origin=${flightData.from}`)
      );
      await expect(page).toHaveURL(
        new RegExp(`destination=${flightData.to}`)
      );
    }
  });
});
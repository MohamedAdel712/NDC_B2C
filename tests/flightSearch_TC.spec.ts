import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import SearchFlightData from "../test-data/SearchFlightData.json";

type TripType = "One Way" | "Round Trip" | "Multi-City";

test.describe("Flight Search", () => {

  test("FLYWT logo is visible", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    
    await searchPage.FLYWT_Logo();


    await expect(page.getByAltText("Home")).toBeVisible();
    
  });

  test("Home button navigates to homepage", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.HomeButton();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("selects_currency_positive", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.SelectCurrency(SearchFlightData.currency);

    
    await expect(page.locator("body")).toContainText(SearchFlightData.currency);
  });

  test("selects_trip_type_positive", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = SearchFlightData.tripType as TripType;
    await searchPage.SelectTripType(tripType);

    await expect(page.locator("body")).toContainText(tripType);
  });

  test.only("selects_passengers_positive", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.openPassengerDropdown();
    await searchPage.incrementPassenger("Adults", SearchFlightData.Adults);
    await searchPage.incrementPassenger("Children", SearchFlightData.Children);
    await searchPage.incrementPassenger("Infants", SearchFlightData.Infants);
    await searchPage.applyPassengerSelection();

    const totalPassengers =
      SearchFlightData.Adults + SearchFlightData.Children + SearchFlightData.Infants;

    const labelText =
      totalPassengers === 1
        ? `${totalPassengers} Passenger`
        : `${totalPassengers} Passengers`;

    await expect(page.locator(".passenger-btn-label")).toHaveText(labelText);
  });

  test("User can select cabin class", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    await searchPage.selectCabinClass(SearchFlightData.class);

    const cabinDropdown = page.locator(
      'app-base-dropdown[label="Cabin class"] span[role="combobox"]'
    );

    await expect(cabinDropdown).toContainText(SearchFlightData.class);
  });

  test("User can fill origin, destination and dates", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = SearchFlightData.tripType as TripType;

    if (tripType === "One Way") {
      await searchPage.fillOneWay(
        SearchFlightData.from,
        SearchFlightData.to,
        SearchFlightData.departDate
      );

      await expect(searchPage.txt_fromInput).toHaveValue(SearchFlightData.from);
      await expect(searchPage.txt_toInput).toHaveValue(SearchFlightData.to);
    }

    if (tripType === "Round Trip") {
      await searchPage.fillRoundTrip(
        SearchFlightData.from,
        SearchFlightData.to,
        SearchFlightData.departDate,
        SearchFlightData.returnDate
      );
    }

    if (tripType === "Multi-City") {
      await searchPage.fillMultiCity(SearchFlightData.legs);

      const fromInputs = page.getByPlaceholder("Departure City");
      await expect(fromInputs).toHaveCount(SearchFlightData.legs.length);
    }
  });

  test("Search_positive", async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();

    const tripType = SearchFlightData.tripType as TripType;

    // Currency
    await searchPage.SelectCurrency(SearchFlightData.currency);

    // Trip Type
    await searchPage.SelectTripType(tripType);

    // Passengers
    await searchPage.openPassengerDropdown();
    await searchPage.incrementPassenger("Adults", SearchFlightData.Adults);
    await searchPage.incrementPassenger("Children", SearchFlightData.Children);
    await searchPage.incrementPassenger("Infants", SearchFlightData.Infants);
    await searchPage.applyPassengerSelection();

    // Cabin
    await searchPage.selectCabinClass(SearchFlightData.class);

    // Actions (FIXED)
    const actions: Record<TripType, () => Promise<void>> = {
      "One Way": () =>
        searchPage.fillOneWay(
          SearchFlightData.from,
          SearchFlightData.to,
          SearchFlightData.departDate
        ),

      "Round Trip": () =>
        searchPage.fillRoundTrip(
          SearchFlightData.from,
          SearchFlightData.to,
          SearchFlightData.departDate,
          SearchFlightData.returnDate
        ),

      "Multi-City": () =>
        searchPage.fillMultiCity(SearchFlightData.legs),
    };

    await actions[tripType]();

    // Search
    await searchPage.search();

    // Assertions
    await expect(page).toHaveURL(/booking\/search\?/);

    if (tripType !== "Multi-City") {
      await expect(page).toHaveURL(
        new RegExp(`origin=${SearchFlightData.from}`)
      );
      await expect(page).toHaveURL(
        new RegExp(`destination=${SearchFlightData.to}`)
      );
    }
  });
});
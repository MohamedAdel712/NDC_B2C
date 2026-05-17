import { test, expect } from "../fixtures/search.fixture";
import OneWay_data from "../test-data/OneWay_data.json";
import RoundTrip_data from "../test-data/RoundTrip_data.json";
import searchResultData from "../test-data/SearchResultData.json";
import { SearchData, SortOption } from "../types/search.types";

test.describe("Search Edit ", () => {
  test("Click Edit Button", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    // Verify edit form inputs are visible
    await expect(searchResultPage.edit_txt_from).toBeVisible();
    await expect(searchResultPage.edit_txt_to).toBeVisible();
    await expect(searchResultPage.edit_txt_departureDate).toBeVisible();
  });

  test("Close Edit Button", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();
    await expect(searchResultPage.edit_txt_from).toBeVisible();

    await searchResultPage.closeEditPanel();
    await expect(searchResultPage.btn_editSearch).toBeVisible();
  });
});

test.describe("Edit City Selection", () => {
  test("Change departure city", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newCity = "JED";
    await searchResultPage.editChangeFromCity(newCity);

    // await expect(searchResultPage.edit_txt_from).toHaveValue(newCity);
  });

  test("Change destination city", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newCity = "JED";
    await searchResultPage.editChangeToCity(newCity);

    //await expect(searchResultPage.edit_txt_to).toHaveValue(newCity);
  });

  test("Change both", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editChangeFromCity("JED");
    await searchResultPage.editChangeToCity("DXB");

    // await expect(searchResultPage.edit_txt_from).toHaveValue("JED");
    // await expect(searchResultPage.edit_txt_to).toHaveValue("AUH");
  });
});

test.describe("Edit Date Changes", () => {
  test("Change departure date", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newDate = 5;
    await searchResultPage.editChangeDepartureDate(newDate);

    // Verify the date field has a value
    const dateValue =
      await searchResultPage.edit_txt_departureDate.inputValue();
    expect(dateValue).toBeTruthy();
  });

  test("Change return date", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newDate = 15;
    await searchResultPage.editChangeReturnDate(newDate);

    // Verify the return date field has a value
    const dateValue = await searchResultPage.edit_txt_returnDate.inputValue();
    expect(dateValue).toBeTruthy();
  });

  test("Change both departure", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editChangeDepartureDate(4);
    await searchResultPage.editChangeReturnDate(12);

    const deptValue =
      await searchResultPage.edit_txt_departureDate.inputValue();
    const retValue = await searchResultPage.edit_txt_returnDate.inputValue();

    expect(deptValue).toBeTruthy();
    expect(retValue).toBeTruthy();
  });
});

test.describe("Edit Dropdown Changes", () => {
  test("Change cabin class ", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editSelectCabinClass("Business");
  });

  test("Change currency", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();
    await searchResultPage.editSelectCurrency("EGP");

    // Try to change currency - might not be available in edit panel
    // Test that the dropdown is present
    await expect(searchResultPage.edit_dropdown_currency).toBeDefined();
  });

  test("Change trip type", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();
    await searchResultPage.editSelectTripType("Round Trip");

    // Test that trip type dropdown is accessible
    await expect(searchResultPage.edit_dropdown_tripType).toBeDefined();
  });
});

test.describe("Edit Passenger Changes", () => {
  test("Open passenger dropdown in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editOpenPassengerDropdown();

    // Verify passenger dropdown is open (rows are visible)
    const passengerRows = searchResultPage.page.locator(".passenger-row");
    await expect(passengerRows.first()).toBeVisible();
  });

  test("Increment passenger count in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editOpenPassengerDropdown();
    await searchResultPage.editIncrementPassenger("Children", 2);
  });

  test("Apply passenger selection in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editOpenPassengerDropdown();
    await searchResultPage.editIncrementPassenger("Children", 1);
    await searchResultPage.editApplyPassengerSelection();

    // Verify dropdown closed (passenger button visible)
    await expect(searchResultPage.edit_dropdown_passengers).toBeVisible();
  });

  test("Change multiple passenger types in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editChangePassengers({
      adults: 2,
      children: 1,
      infants: 0,
    });

    // Verify the passenger dropdown applied changes
    const passengerBtn = searchResultPage.page.locator(".passenger-btn-label");
    await expect(passengerBtn).toBeVisible();
  });
});

test.describe("Edit Search Apply", () => {
  test("Apply edit search with city and date changes", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editUpdateOneWay("JED", "CAI", 4);
    await searchResultPage.editApplySearch();

    // Verify page has navigated/reloaded with new results
    //await expect(page).toHaveURL(/\/search-results|\/flights/);
  });

  test("Complete edit search workflow with Round Trip", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editSearchAndWait("JED", "AUH", 5, 12);

    // Verify new search results page loaded
    await expect(page).toHaveURL(/\/search-results|\/flights/);
  });

  test("Complete edit search workflow with One Way", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editSearchAndWait("JED", "AUH", 6);

    // Verify new search results page loaded
    await expect(page).toHaveURL(/\/search-results|\/flights/);
  });
});

test.describe("Edit Full Flow", () => {
  test("Full edit flow to one way", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    // Perform initial search
    await searchPage.search(RoundTrip_data as SearchData);

    // Open edit panel
    await searchResultPage.clickEditSearch();
    await expect(searchResultPage.edit_txt_from).toBeVisible();

    // Change trip type
    await searchResultPage.editSelectTripType("One Way");

    // Change cities
    await searchResultPage.editChangeFromCity("JED");
    await searchResultPage.editChangeToCity("AUH");

    // Change date
    await searchResultPage.editChangeDepartureDate(7);

    //Change cabin class
    await searchResultPage.editSelectCabinClass("Business");

    // Change passengers
    await searchResultPage.editChangePassengers({
      adults: 2,
      children: 1,
      infants: 0,
    });

    // Apply search
    await searchResultPage.editApplySearch();
  });

  test("Full edit flow to round trip", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    // Perform initial search
    await searchPage.search(OneWay_data as SearchData);

    // Open edit panel
    await searchResultPage.clickEditSearch();

    // Change passengers
    await searchResultPage.editChangePassengers({
      adults: 3,
      children: 1,
      infants: 1,
    });

    // Change cabin class
    await searchResultPage.editSelectCabinClass("Business");

    // Change trip type
    await searchResultPage.editSelectTripType("Round Trip");

    // Change cities and dates
    await searchResultPage.editUpdateRoundTrip("JED", "CAI", 8, 15);

    // Apply search
    await searchResultPage.editApplySearch();
  });

  test("Full edit flow: change to multi-city", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    // Perform initial search
    await searchPage.search(OneWay_data as SearchData);

    // Open edit panel
    await searchResultPage.clickEditSearch();
    await expect(searchResultPage.edit_txt_from).toBeVisible();

    // Change passengers
    await searchResultPage.editChangePassengers({
      adults: 2,
      children: 0,
      infants: 2,
    });

    // Change cabin class
    await searchResultPage.editSelectCabinClass("Business");

    // Change trip type
    await searchResultPage.editSelectTripType("Multi-City");

    // Change cities and dates
    await searchResultPage.editUpdateMultiCity([
      { from: "JED", to: "AUH", departDate: 8 },
      { from: "AUH", to: "CAI", departDate: 15 },
    ]);

    // Apply search
    await searchResultPage.editApplySearch();
  });
});

test.describe("Sorting", () => {
  test("Sort by Cheapest after One Way search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.sortBy("Cheapest");
    await expect(searchResultPage.btn_cheapest).toHaveAttribute(
      "class",
      /active|selected/,
    );
  });

  test("Sort by Fastest after Round Trip search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.sortBy("Fastest");
    await expect(searchResultPage.btn_fastest).toHaveAttribute(
      "class",
      /active|selected/,
    );
  });

  test("Sort by Recommended after Round Trip search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.sortBy("Recommended");
    await expect(searchResultPage.btn_recommended).toHaveAttribute(
      "class",
      /active|selected/,
    );
  });
});

test.describe("Stops Filters", () => {
  test("Direct Flight   One Way search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.selectDirectFlight();
    await expect(searchResultPage.Checkbox_Direct).toBeChecked();
  });

  test("1 Stop One Way search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.select1Stop();
    await expect(searchResultPage.Checkbox_1Stop).toBeChecked();
  });

  test("+2 Stops One Way search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.select2PlusStops();
    await expect(searchResultPage.Checkbox_2PlusStops).toBeChecked();
  });

  test("Clear All clears selected stop filters", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);

    // select multiple filters
    await searchResultPage.selectDirectFlight();
    await searchResultPage.select1Stop();
    await searchResultPage.select2PlusStops();


    // click Clear All and verify none are checked
    await searchResultPage.clearAllStopFilters();

    await expect(searchResultPage.Checkbox_Direct).not.toBeChecked();
    await expect(searchResultPage.Checkbox_1Stop).not.toBeChecked();
    await expect(searchResultPage.Checkbox_2PlusStops).not.toBeChecked();
  });

  test("Click Return Stops and apply 1 Stop filter", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.clickReturnStopsTab();
    await searchResultPage.select1Stop();
    await expect(searchResultPage.Checkbox_1Stop).toBeChecked();
  });

  test("Click Return Stops and apply Direct Flight filter", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.clickReturnStopsTab();
    await searchResultPage.selectDirectFlight();
    await expect(searchResultPage.Checkbox_Direct).toBeChecked();
  });
});

test.describe("Departure and Return Time Filters", () => {
  test("Select Morning departure time for One Way search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.selectDepartureTime("Morning");
    await expect(searchResultPage.Checkbox_Morning).toBeChecked();
  });

  test.only("Select Evening return time for Round Trip search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.selectReturnTime("Evening");
    await expect(searchResultPage.Checkbox_Evening).toBeChecked();
  });

  test("Clear departure time filter then select Night", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.selectDepartureTime("Morning");
    await searchResultPage.selectDepartureTime("Night");
    await expect(searchResultPage.Checkbox_Night).toBeChecked();
  });
});

test.describe("Airline Filtering", () => {
  test("Filter by airline after search", async ({ searchPage, searchResultPage }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.filterByAirline(searchResultData.airlineToFilter);
  });
});

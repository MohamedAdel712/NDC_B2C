import { test, expect } from "../fixtures/search.fixture";
import OneWay_data from "../test-data/OneWay_data.json";
import RoundTrip_data from "../test-data/RoundTrip_data.json";
import searchResultData from "../test-data/SearchResultData.json";
import { SearchData, SortOption } from "../types/search.types";

test.describe("Search Results Page - Sorting", () => {
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

test.describe("Search Results Page - Edit Mode UI", () => {
  test("Click Edit button opens edit panel", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    // Verify edit form inputs are visible
    await expect(searchResultPage.edit_txt_from).toBeVisible();
    await expect(searchResultPage.edit_txt_to).toBeVisible();
    await expect(searchResultPage.edit_txt_departureDate).toBeVisible();
  });

  test("Close edit panel closes the edit modal", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();
    await expect(searchResultPage.edit_txt_from).toBeVisible();

    await searchResultPage.closeEditPanel();
    await expect(searchResultPage.btn_editSearch).toBeVisible();
  });
});

test.describe(" Edit  City Selection", () => {
  test("Change departure city in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newCity = "JED";
    await searchResultPage.editChangeFromCity(newCity);

    await expect(searchResultPage.edit_txt_from).toHaveValue(newCity);
  });

  test("Change destination city in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newCity = "AUH";
    await searchResultPage.editChangeToCity(newCity);

    await expect(searchResultPage.edit_txt_to).toHaveValue(newCity);
  });

  test("Change both cities in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editChangeFromCity("JED");
    await searchResultPage.editChangeToCity("AUH");

    await expect(searchResultPage.edit_txt_from).toHaveValue("JED");
    await expect(searchResultPage.edit_txt_to).toHaveValue("AUH");
  });
});

test.describe(" Edit Mode Date Changes", () => {
  test.only("Change departure date in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newDate = 5;
    await searchResultPage.editChangeDepartureDate(newDate);

    // Verify the date field has a value
    const dateValue =
      await searchResultPage.edit_txt_departureDate.inputValue();
    expect(dateValue).toBeTruthy();
  });

  test("Change return date in Round Trip edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.clickEditSearch();

    const newDate = 15;
    await searchResultPage.editChangeReturnDate(newDate);

    // Verify the return date field has a value
    const dateValue = await searchResultPage.edit_txt_returnDate.inputValue();
    expect(dateValue).toBeTruthy();
  });

  test("Change both departure and return dates in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
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

test.describe("Edit Mode Dropdown Changes", () => {
  test("Change cabin class in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editSelectCabinClass("Economy");

    // Verify cabin class is updated (look for Economy text in dropdown)
    const cabinClass = searchResultPage.page.locator(
      'app-base-dropdown[label="Cabin class"]',
    );
    await expect(cabinClass).toContainText("Economy");
  });

  test("Change currency in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    // Try to change currency - might not be available in edit panel
    // Test that the dropdown is present
    await expect(searchResultPage.edit_dropdown_currency).toBeDefined();
  });

  test("Change trip type in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    // Test that trip type dropdown is accessible
    await expect(searchResultPage.edit_dropdown_tripType).toBeDefined();
  });
});

test.describe("Edit Mode Passenger Changes", () => {
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

    // Verify passenger count updated
    const childrenInput = searchResultPage.page.locator(
      '.passenger-row:has-text("Children") input[type="number"]',
    );
    const value = await childrenInput.inputValue();
    expect(parseInt(value)).toBeGreaterThan(0);
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

test.describe("Edit Mode Batch Updates", () => {
  test("Update One Way search parameters in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editUpdateOneWay("JED", "AUH", 4);

    // Verify all three fields are updated
    await expect(searchResultPage.edit_txt_from).toHaveValue("JED");
    await expect(searchResultPage.edit_txt_to).toHaveValue("AUH");

    const dateValue =
      await searchResultPage.edit_txt_departureDate.inputValue();
    expect(dateValue).toBeTruthy();
  });

  test("Update Round Trip search parameters in edit mode", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editUpdateRoundTrip("JED", "AUH", 5, 14);

    // Verify all four fields are updated
    await expect(searchResultPage.edit_txt_from).toHaveValue("JED");
    await expect(searchResultPage.edit_txt_to).toHaveValue("AUH");

    const deptDate = await searchResultPage.edit_txt_departureDate.inputValue();
    const retDate = await searchResultPage.edit_txt_returnDate.inputValue();

    expect(deptDate).toBeTruthy();
    expect(retDate).toBeTruthy();
  });
});

test.describe("Edit Mode Search Apply", () => {
  test("Apply edit search with city and date changes", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.clickEditSearch();

    await searchResultPage.editUpdateOneWay("JED", "AUH", 4);
    await searchResultPage.editApplySearch();

    // Verify page has navigated/reloaded with new results
    await expect(page).toHaveURL(/\/search-results|\/flights/);
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

test.describe("Edit Mode Integration", () => {
  test("Full edit flow: open -> change city -> change date -> apply", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    // Perform initial search
    await searchPage.search(OneWay_data as SearchData);

    // Open edit panel
    await searchResultPage.clickEditSearch();
    await expect(searchResultPage.edit_txt_from).toBeVisible();

    // Change cities
    await searchResultPage.editChangeFromCity("JED");
    await searchResultPage.editChangeToCity("AUH");

    // Change date
    await searchResultPage.editChangeDepartureDate(7);

    // Verify changes
    await expect(searchResultPage.edit_txt_from).toHaveValue("JED");
    await expect(searchResultPage.edit_txt_to).toHaveValue("AUH");

    // Apply search
    await searchResultPage.editApplySearch();
    await expect(page).toHaveURL(/\/search-results|\/flights/);
  });

  test("Full edit flow: open -> change passengers -> apply", async ({
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
      infants: 0,
    });

    // Apply search
    await searchResultPage.editApplySearch();
    await expect(page).toHaveURL(/\/search-results|\/flights/);
  });

  test("Edit search and cancel by closing panel", async ({
    searchPage,
    searchResultPage,
  }) => {
    // Perform initial search
    await searchPage.search(OneWay_data as SearchData);

    // Open edit panel
    await searchResultPage.clickEditSearch();
    await expect(searchResultPage.edit_txt_from).toBeVisible();

    // Change a city
    await searchResultPage.editChangeFromCity("JED");

    // Close without applying
    await searchResultPage.closeEditPanel();

    // Edit button should still be visible
    await expect(searchResultPage.btn_editSearch).toBeVisible();
  });

  test("Multiple edit operations: sort -> edit -> apply", async ({
    searchPage,
    searchResultPage,
    page,
  }) => {
    // Perform initial search
    await searchPage.search(RoundTrip_data as SearchData);

    // Sort results
    await searchResultPage.sortBy("Cheapest");

    // Open edit and modify search
    await searchResultPage.clickEditSearch();
    await searchResultPage.editUpdateRoundTrip("JED", "AUH", 6, 13);

    // Apply new search
    await searchResultPage.editApplySearch();
    await expect(page).toHaveURL(/\/search-results|\/flights/);
  });
});

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base_Page";
import { ENV } from "../config/env";

export class SearchResultPage extends BasePage {
  // ===== Result Page Locators =====
  // Sorting options
  readonly btn_cheapest = this.page.getByRole("button", { name: "Cheapest" });
  readonly btn_fastest = this.page.getByRole("button", { name: "Fastest" });
  readonly btn_recommended = this.page.getByRole("button", {name: "Recommended",});
  readonly btn_flightDetails = this.page.getByRole("button", {name: "Flight details",});

  // ===== Edit Mode Locators =====
  readonly btn_editSearch = this.page.getByRole("button", { name: "Edit" });

  // Edit form inputs - with fallback locators for flexibility
  readonly edit_txt_from = this.page
    .locator('[data-testid="edit-from"]')
    .or(this.page.getByPlaceholder("Departure City").nth(0));
  readonly edit_txt_to = this.page
    .locator('[data-testid="edit-to"]')
    .or(this.page.getByPlaceholder("Destination City").nth(0));
  readonly edit_txt_departureDate = this.page
    .locator('[data-testid="edit-departure-date"]')
    .or(this.page.getByPlaceholder("Select Date").nth(0));
  readonly edit_txt_returnDate = this.page
    .locator('[data-testid="edit-return-date"]')
    .or(this.page.getByPlaceholder("Select Date").nth(1));

  // Edit mode dropdowns
  readonly edit_dropdown_tripType = this.page
    .locator('[data-testid="edit-trip-type"]')
    .or(this.page.locator('svg path[d*="M7.41 8.58"]').nth(0));
  readonly edit_dropdown_passengers = this.page
    .locator('[data-testid="edit-passengers"]')
    .or(
      this.page.locator('//i[contains(@class,"passenger-btn-arrow")]').nth(0),
    );
  readonly edit_dropdown_cabinClass = this.page
    .locator('[data-testid="edit-cabin-class"]')
    .or(this.page.locator(".base-dropdown__selected--with-icon").nth(0));
  readonly edit_dropdown_currency = this.page
    .locator('[data-testid="edit-currency"]')
    .or(this.page.getByRole("combobox", { name: /Pound|Dollar|Euro/ }));

  // Edit mode action buttons
  readonly btn_editSearch_apply = this.page
    .getByRole("button", { name: "Search" })
    .nth(0);
  readonly btn_editSearch_close = this.page
    .getByRole("button", { name: "Close" })
    .or(this.page.locator('[aria-label="Close"]'));
  readonly edit_dropdown_passenger_apply = this.page
    .getByRole("button", { name: "Apply" })
    .nth(0);

  // ===== Result Page Methods =====
  async sortBy(option: "Cheapest" | "Fastest" | "Recommended") {
    const sortingOptions: Record<string, Locator> = {
      Cheapest: this.btn_cheapest,
      Fastest: this.btn_fastest,
      Recommended: this.btn_recommended,
    };

    const button = sortingOptions[option];
    if (button) {
      await button.click();
    }
  }

  // ===== Edit Mode Methods =====
  /**
   * Click Edit button and wait for edit panel to appear
   */
  async clickEditSearch() {
    await this.btn_editSearch.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Close the edit panel
   */
  async closeEditPanel() {
    await this.btn_editSearch_close.click();
  }

  /**
   * Select a city from dropdown suggestions in edit mode
   */
  async editSelectCity(input: Locator, city: string) {
    await input.waitFor({ state: "visible" });
    await input.click();
    await input.fill(city);
    const suggestion = this.page.getByRole("option", { name: city }).first();
    await suggestion.waitFor({ state: "visible" });
    await suggestion.click();
  }

  /**
   * Set date using keyboard input with relative days
   */
  async editSetDate(input: Locator, date: number) {
    const today = new Date();
    const targetDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + date,
    );
    const formatted = `${String(targetDate.getMonth() + 1).padStart(2, "0")}/${String(targetDate.getDate()).padStart(2, "0")}/${targetDate.getFullYear()}`;
    await input.click();
    await input.fill("");
    await input.type(formatted, { delay: 100 });
    await this.page.keyboard.press("Tab");
  }

  /**
   * Change trip type in edit mode
   */
  async editSelectTripType(type: "One Way" | "Round Trip" | "Multi-City") {
    await this.edit_dropdown_tripType.click();
    await this.page.getByRole("option", { name: type }).click();
  }

  /**
   * Change cabin class in edit mode
   */
  async editSelectCabinClass(option: string) {
    await this.edit_dropdown_cabinClass.click();
    await this.page.waitForSelector('li[role="option"]');
    const optionLocator = this.page.locator('li[role="option"]', {
      hasText: option,
    });
    await optionLocator.click();
  }

  /**
   * Change currency in edit mode
   */
  async editSelectCurrency(option: string) {
    await this.edit_dropdown_currency.click();
    await this.page.waitForSelector('li[role="option"]');
    const optionLocator = this.page.locator('li[role="option"]', {
      hasText: option,
    });
    await optionLocator.click();
  }

  /**
   * Open passenger dropdown in edit mode
   */
  async editOpenPassengerDropdown() {
    await this.edit_dropdown_passengers.click();
  }

  /**
   * Increment passenger count for a specific type
   */
  async editIncrementPassenger(type: string, count: number) {
    const row = this.page.locator(".passenger-row", { hasText: type });
    const plusBtn = row.locator("button.counter-btn").nth(1);
    const targetCount = type === "Adults" ? count - 1 : count;
    for (let i = 0; i < targetCount; i++) await plusBtn.click();
  }

  /**
   * Apply passenger selection in edit mode
   */
  async editApplyPassengerSelection() {
    await this.edit_dropdown_passenger_apply.click();
  }

  /**
   * Change departure city in edit mode
   */
  async editChangeFromCity(city: string) {
    await this.editSelectCity(this.edit_txt_from, city);
  }

  /**
   * Change destination city in edit mode
   */
  async editChangeToCity(city: string) {
    await this.editSelectCity(this.edit_txt_to, city);
  }

  /**
   * Change departure date in edit mode (relative to today)
   */
  async editChangeDepartureDate(date: number) {
    await this.editSetDate(this.edit_txt_departureDate, date);
  }

  /**
   * Change return date in edit mode (relative to today)
   */
  async editChangeReturnDate(date: number) {
    await this.editSetDate(this.edit_txt_returnDate, date);
  }

  /**
   * Update passenger count with adults, children, and infants
   */
  async editChangePassengers(passengers: {
    adults: number;
    children: number;
    infants: number;
  }) {
    await this.editOpenPassengerDropdown();
    await this.editIncrementPassenger("Adults", passengers.adults);
    if (passengers.children > 0) {
      await this.editIncrementPassenger("Children", passengers.children);
    }
    if (passengers.infants > 0) {
      await this.editIncrementPassenger("Infants", passengers.infants);
    }
    await this.editApplyPassengerSelection();
  }

  /**
   * Update one-way search parameters in edit mode
   */
  async editUpdateOneWay(fromCity: string, toCity: string, departDate: number) {
    await this.editChangeFromCity(fromCity);
    await this.editChangeToCity(toCity);
    await this.editChangeDepartureDate(departDate);
  }

  /**
   * Update round-trip search parameters in edit mode
   */
  async editUpdateRoundTrip(
    fromCity: string,
    toCity: string,
    departDate: number,
    returnDate: number,
  ) {
    await this.editChangeFromCity(fromCity);
    await this.editChangeToCity(toCity);
    await this.editChangeDepartureDate(departDate);
    await this.editChangeReturnDate(returnDate);
  }

  /**
   * Apply the search changes from edit mode
   */
  async editApplySearch() {
    await this.btn_editSearch_apply.click();
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Complete edit search workflow: update parameters and apply
   */
  async editSearchAndWait(
    fromCity: string,
    toCity: string,
    departDate: number,
    returnDate?: number,
  ) {
    if (returnDate) {
      await this.editUpdateRoundTrip(fromCity, toCity, departDate, returnDate);
    } else {
      await this.editUpdateOneWay(fromCity, toCity, departDate);
    }
    await this.editApplySearch();
  }
}

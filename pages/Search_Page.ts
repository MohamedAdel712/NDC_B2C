import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base_Page";
import { ENV } from "../config/env";
import { SearchData } from "../types/search.types";

export class SearchPage extends BasePage {
  readonly txt_fromInput = this.page.getByPlaceholder("Departure City");
  readonly txt_toInput = this.page.getByPlaceholder("Destination City");
  readonly txt_dateInput = this.page.getByPlaceholder("Select Date");
  readonly btn_searchButton = this.page.getByRole("button", {
    name: "Go",
    exact: true,
  });
  readonly img_FLYWTLogo = this.page.getByAltText("Home");
  readonly link_MyBooking = this.page.getByRole("link", { name: "My Booking" });
  readonly btn_Home = this.page.getByRole("link", { name: "Home" });
  readonly dropdown_Currency = this.page.getByRole("combobox", {
    name: "Egyptian Pound",
  });
  readonly dropdown_TripType = this.page.getByRole("combobox", {
    name: "One Way",
  });
  readonly dropdown_CabinClass = this.page.getByRole("combobox", {
    name: "Economy",
  });
  readonly dropdown_open_Passenger = this.page.locator(
    ".passenger-select__btn-content",
  );
  readonly dropdown_Passenger_apply = this.page.getByRole("button", {
    name: "Apply",
  });

  async goto() {
    await this.navigate(ENV.BASE_URL);
  }
  // logo
  async FLYWTLogo() {
    await this.img_FLYWTLogo.click();
  }

  async clickMyBooking() {
    await this.link_MyBooking.click();
  }

  //homeButton
  async HomeButton() {
    await this.btn_Home.click();
  }

  //currency
  async selectCurrency(option: string) {
    await this.dropdown_Currency.click();
    await this.page.waitForSelector('li[role="option"]');

    const optionLocator = this.page.locator('li[role="option"]', {
      hasText: option,
    });
    await optionLocator.click();
  }

  //tripType
  async selectTripType(type: "One Way" | "Round Trip" | "Multi-City") {
    await this.dropdown_TripType.click();
    await this.page.getByRole("option", { name: type }).click();
  }

  async selectCity(input: Locator, city: string) {
    await input.waitFor({ state: "visible" });
    await input.click();
    await input.fill(city);
    const suggestion = this.page.getByRole("option", { name: city }).first();
    await suggestion.waitFor({ state: "visible" });
    await suggestion.click();
  }

  async openPassengerDropdown() {
    await this.dropdown_open_Passenger.click();
  }

  async incrementPassenger(type: string, count: number) {
    const row = this.page.locator(".passenger-row", { hasText: type });
    const plusBtn = row.locator("button.counter-btn").nth(1);
    const targetCount = type === "Adults" ? count - 1 : count;
    for (let i = 0; i < targetCount; i++) await plusBtn.click();
  }

  async applyPassengerSelection() {
    await this.dropdown_Passenger_apply.click();
  }

  async selectCabinClass(option: string) {
    await this.dropdown_CabinClass.click();
    await this.page.waitForSelector('li[role="option"]');
    const optionLocator = this.page.locator('li[role="option"]', {
      hasText: option,
    });
    await optionLocator.click();
  }

  async setDate(input: Locator, date: number) {
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

  async fillOneWay(fromCity: string, toCity: string, departDate: number) {
    await this.selectCity(this.txt_fromInput, fromCity);
    await this.selectCity(this.txt_toInput, toCity);
    await this.setDate(this.txt_dateInput, departDate);
  }

  async fillRoundTrip(
    fromCity: string,
    toCity: string,
    departDate: number,
    returnDate: number,
  ) {
    await this.selectCity(this.txt_fromInput, fromCity);
    await this.selectCity(this.txt_toInput, toCity);

    const dateInputs = this.page.getByPlaceholder("Select Date");
    await this.setDate(dateInputs.nth(0), departDate);
    await this.setDate(dateInputs.nth(1), returnDate);
  }

  async fillMultiCity(
    legs: { from: string; to: string; departDate: number }[],
  ) {
    const fromInputs = this.page.getByPlaceholder("Departure City");
    const toInputs = this.page.getByPlaceholder("Destination City");
    const dateInputs = this.page.getByPlaceholder("Select Date");

    for (let i = 0; i < legs.length; i++) {
      if (i > 0) {
        await this.page.getByRole("button", { name: "Add A Flight" }).click();
        await fromInputs.nth(i).waitFor({ state: "visible" });
      }
      await this.selectCity(fromInputs.nth(i), legs[i].from);
      await this.selectCity(toInputs.nth(i), legs[i].to);
      await this.setDate(dateInputs.nth(i), legs[i].departDate);
    }
  }
  async search(data: SearchData) {
    await this.goto();
    if (data.currency) await this.selectCurrency(data.currency);
    await this.selectTripType(data.tripType);
    await this.openPassengerDropdown();
    if (data.Adults) await this.incrementPassenger("Adults", data.Adults);
    if (data.Children) await this.incrementPassenger("Children", data.Children);
    if (data.Infants) await this.incrementPassenger("Infants", data.Infants);
    await this.applyPassengerSelection();
    if (data.class) await this.selectCabinClass(data.class);

    if (data.tripType === "One Way")
      await this.fillOneWay(data.from!, data.to!, data.departDate!);
    else if (data.tripType === "Round Trip")
      await this.fillRoundTrip(
        data.from!,
        data.to!,
        data.departDate!,
        data.returnDate!,
      );
    else if (data.tripType === "Multi-City")
      await this.fillMultiCity(data.legs!);

    await this.btn_searchButton.click();
  }
}

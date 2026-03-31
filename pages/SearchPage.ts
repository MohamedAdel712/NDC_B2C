import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ENV } from "../config/env";

export class SearchPage extends BasePage {
  readonly fromInput: Locator;
  readonly toInput: Locator;
  readonly dateInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fromInput = page.getByPlaceholder("Departure City");
    this.toInput = page.getByPlaceholder("Destination City");
    this.dateInput = page.getByPlaceholder("Select Date");
    this.searchButton = page.getByRole("button", { name: "Go" });
  }

  async goto() {
    await this.navigate(ENV.BASE_URL);
  }
  // logo
  async FLYWTLogo() {
    const logo = this.page.getByAltText("Home");
    await logo.click();
  }


  //homeButton
  async HomeButton() {
    await this.page.getByRole("link", { name: "Home" }).click();
  }


  //currency
  async selectCurrency(option: string) {
    const currencyDropdown = this.page.getByRole('combobox', {
      name: 'Egyptian Pound',
    });
    await currencyDropdown.click();
    await this.page.waitForSelector('li[role="option"]');

    const optionLocator = this.page.locator('li[role="option"]', {
      hasText: option,
    });
    await optionLocator.click();
  }



  //tripType
  async selectTripType(type: 'One Way' | 'Round Trip' | 'Multi-City') {
    await this.page.getByRole('combobox', { name: 'One Way' }).click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async selectCity(input: Locator, city: string) {
    await input.click();
    await input.fill(city);
    await this.page.getByText(city).first().click();
  }


  
  async openPassengerDropdown() {
    await this.page.locator(".passenger-select__btn-content").click();
  }

  async incrementPassenger(type: string, count: number) {
    const row = this.page.locator(".passenger-row", { hasText: type });
    const plusBtn = row.locator("button.counter-btn").nth(1);
    const targetCount = type === "Adults" ? count - 1 : count;
    for (let i = 0; i < targetCount; i++) await plusBtn.click();
  }

  async applyPassengerSelection() {
    await this.page.getByRole("button", { name: "Apply" }).click();
  }

  async selectCabinClass(option: string) {
    const cabinDropdown = this.page.locator(
      'app-base-dropdown[label="Cabin class"] span[role="combobox"]',
    );
    await cabinDropdown.click();
    await this.page.getByRole("option", { name: option }).click();
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
    await this.selectCity(this.fromInput, fromCity);
    await this.selectCity(this.toInput, toCity);
    await this.setDate(this.dateInput, departDate);
  }

 async fillRoundTrip(
  fromCity: string,
  toCity: string,
  departDate: number,
  returnDate: number,
) {
  await this.selectCity(this.fromInput, fromCity);
  await this.selectCity(this.toInput, toCity);

  // Departure date
  const departureInput = this.page
    .locator('app-base-date-picker')
    .filter({ hasText: 'Departure' })
    .getByPlaceholder('Select Date');
  await this.setDate(departureInput, departDate);

  // Return date
  const returnInput = this.page
    .locator('app-base-date-picker')
    .filter({ hasText: 'Return' })
    .getByPlaceholder('Select Date');
  await this.setDate(returnInput, returnDate);
}


 async fillMultiCity(
  legs: { from: string; to: string; departDate: number }[],
) {
  // add segments لو محتاج
  for (let i = 1; i < legs.length; i++) {
    await this.page.getByRole('button', { name: 'Add Flight' }).click();
  }

  const fromInputs = this.page.getByPlaceholder("Departure City");
  const toInputs = this.page.getByPlaceholder("Destination City");
  const dateInputs = this.page.getByPlaceholder("Select Date");

  for (let i = 0; i < legs.length; i++) {
    await this.selectCity(fromInputs.nth(i), legs[i].from);
    await this.selectCity(toInputs.nth(i), legs[i].to);
    await this.setDate(dateInputs.nth(i), legs[i].departDate);
  }
}
  async search() {
    await this.searchButton.click();
  }
}

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ENV } from "../config/env";

export class SearchPage extends BasePage {
  
    readonly txt_fromInput =this.page.getByPlaceholder("Departure City");
    readonly txt_toInput = this.page.getByPlaceholder("Destination City");
    readonly txt_dateInput = this.page.getByPlaceholder("Select Date");
    readonly btn_searchButton = this.page.getByRole("button", { name: "Go" });
    readonly img_flyWTLogo = this.page.getByAltText("Home");
    readonly link_myBooking= this.page.getByRole('link',{name:'My Bookings'});
    readonly btn_homeButton = this.page.getByRole("link", { name: "Home" });
    readonly drop_selectCurrency = this.page.getByRole('combobox', { name: 'Egyptian Pound' });
    readonly drop_tripType = this.page.getByRole('combobox', { name: 'One Way' });
    

  

  async goto() {
    await this.navigate(ENV.BASE_URL);
  }
  // logo
  async FLYWT_Logo() {
    await this.img_flyWTLogo.click();
  }

  async MyBookings() {
    await this.link_myBooking.click(); }
  //homeButton
  async HomeButton() {
    await this.btn_homeButton.click();
  }

  //currency
  async SelectCurrency(option: string) {
    await this.drop_selectCurrency.click();
    await this.page.waitForSelector('li[role="option"]');

  
    await  this.page.getByRole('option', { name: option }).click();
  }



  //tripType
  async SelectTripType(type: 'One Way' | 'Round Trip' | 'Multi-City') {
    await this.drop_tripType.click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async SelectCity(input: Locator, city: string) {
    await input.click();
    await input.fill(city);
    await this.page.getByText(city).first().click();
  }


  //ADD PASSENGER
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

 

//cabin class
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
    await this.SelectCity(this.txt_fromInput, fromCity);
    await this.SelectCity(this.txt_toInput, toCity);
    await this.setDate(this.txt_dateInput, departDate);
  }

 async fillRoundTrip(
  fromCity: string,
  toCity: string,
  departDate: number,
  returnDate: number,
) {
  await this.SelectCity(this.txt_fromInput, fromCity);
  await this.SelectCity(this.txt_toInput, toCity);

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
 ){
  for (let i = 1; i < legs.length; i++) {
    await this.page.getByRole('button', { name: 'Add Flight' }).click();
  }

  const fromInputs = this.page.getByPlaceholder("Departure City");
  const toInputs = this.page.getByPlaceholder("Destination City");
  const dateInputs = this.page.getByPlaceholder("Select Date");

  for (let i = 0; i < legs.length; i++) {
    await this.SelectCity(fromInputs.nth(i), legs[i].from);
    await this.SelectCity(toInputs.nth(i), legs[i].to);
    await this.setDate(dateInputs.nth(i), legs[i].departDate);
  }
}
  async search() {
    await this.btn_searchButton.click();
  }
}

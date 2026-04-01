# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flightSearch.spec.ts >> Flight Search >> User can search flight successfully
- Location: tests\flightSearch.spec.ts:112:8

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('combobox', { name: 'One Way' })
    - locator resolved to <span pc24="" pc25="" tabindex="0" role="combobox" id="bd-tne3n4i" autofocus="true" aria-label="One Way" aria-disabled="false" aria-expanded="false" aria-required="false" aria-haspopup="listbox" data-pc-section="label" class="p-select-label ng-star-inserted">…</span>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

```

# Test source

```ts
  1   | import { Page, Locator } from "@playwright/test";
  2   | import { BasePage } from "./BasePage";
  3   | import { ENV } from "../config/env";
  4   | 
  5   | export class SearchPage extends BasePage {
  6   |   readonly fromInput: Locator;
  7   |   readonly toInput: Locator;
  8   |   readonly dateInput: Locator;
  9   |   readonly searchButton: Locator;
  10  | 
  11  |   constructor(page: Page) {
  12  |     super(page);
  13  |     this.fromInput = page.getByPlaceholder("Departure City");
  14  |     this.toInput = page.getByPlaceholder("Destination City");
  15  |     this.dateInput = page.getByPlaceholder("Select Date");
  16  |     this.searchButton = page.getByRole("button", { name: "Go" });
  17  |   }
  18  | 
  19  |   async goto() {
  20  |     await this.navigate(ENV.BASE_URL);
  21  |   }
  22  |   // logo
  23  |   async FLYWTLogo() {
  24  |     const logo = this.page.getByAltText("Home");
  25  |     await logo.click();
  26  |   }
  27  | 
  28  | 
  29  |   //homeButton
  30  |   async HomeButton() {
  31  |     await this.page.getByRole("link", { name: "Home" }).click();
  32  |   }
  33  | 
  34  | 
  35  |   //currency
  36  |   async selectCurrency(option: string) {
  37  |     const currencyDropdown = this.page.getByRole('combobox', {
  38  |       name: 'Egyptian Pound',
  39  |     });
  40  |     await currencyDropdown.click();
  41  |     await this.page.waitForSelector('li[role="option"]');
  42  | 
  43  |     const optionLocator = this.page.locator('li[role="option"]', {
  44  |       hasText: option,
  45  |     });
  46  |     await optionLocator.click();
  47  |   }
  48  | 
  49  | 
  50  | 
  51  |   //tripType
  52  |   async selectTripType(type: 'One Way' | 'Round Trip' | 'Multi-City') {
> 53  |     await this.page.getByRole('combobox', { name: 'One Way' }).click();
      |                                                                ^ Error: locator.click: Target page, context or browser has been closed
  54  |     await this.page.getByRole('option', { name: type }).click();
  55  |   }
  56  | 
  57  |   async selectCity(input: Locator, city: string) {
  58  |     await input.click();
  59  |     await input.fill(city);
  60  |     await this.page.getByText(city).first().click();
  61  |   }
  62  | 
  63  | 
  64  |   
  65  |   async openPassengerDropdown() {
  66  |     await this.page.locator(".passenger-select__btn-content").click();
  67  |   }
  68  | 
  69  |   async incrementPassenger(type: string, count: number) {
  70  |     const row = this.page.locator(".passenger-row", { hasText: type });
  71  |     const plusBtn = row.locator("button.counter-btn").nth(1);
  72  |     const targetCount = type === "Adults" ? count - 1 : count;
  73  |     for (let i = 0; i < targetCount; i++) await plusBtn.click();
  74  |   }
  75  | 
  76  |   async applyPassengerSelection() {
  77  |     await this.page.getByRole("button", { name: "Apply" }).click();
  78  |   }
  79  | 
  80  |   async selectCabinClass(option: string) {
  81  |     const cabinDropdown = this.page.locator(
  82  |       'app-base-dropdown[label="Cabin class"] span[role="combobox"]',
  83  |     );
  84  |     await cabinDropdown.click();
  85  |     await this.page.getByRole("option", { name: option }).click();
  86  |   }
  87  | 
  88  |   async setDate(input: Locator, date: number) {
  89  |     const today = new Date();
  90  |     const targetDate = new Date(
  91  |       today.getFullYear(),
  92  |       today.getMonth(),
  93  |       today.getDate() + date,
  94  |     );
  95  |     const formatted = `${String(targetDate.getMonth() + 1).padStart(2, "0")}/${String(targetDate.getDate()).padStart(2, "0")}/${targetDate.getFullYear()}`;
  96  |     await input.click();
  97  |     await input.fill("");
  98  |     await input.type(formatted, { delay: 100 });
  99  |     await this.page.keyboard.press("Tab");
  100 |   }
  101 | 
  102 |   async fillOneWay(fromCity: string, toCity: string, departDate: number) {
  103 |     await this.selectCity(this.fromInput, fromCity);
  104 |     await this.selectCity(this.toInput, toCity);
  105 |     await this.setDate(this.dateInput, departDate);
  106 |   }
  107 | 
  108 |  async fillRoundTrip(
  109 |   fromCity: string,
  110 |   toCity: string,
  111 |   departDate: number,
  112 |   returnDate: number,
  113 | ) {
  114 |   await this.selectCity(this.fromInput, fromCity);
  115 |   await this.selectCity(this.toInput, toCity);
  116 | 
  117 |   // Departure date
  118 |   const departureInput = this.page
  119 |     .locator('app-base-date-picker')
  120 |     .filter({ hasText: 'Departure' })
  121 |     .getByPlaceholder('Select Date');
  122 |   await this.setDate(departureInput, departDate);
  123 | 
  124 |   // Return date
  125 |   const returnInput = this.page
  126 |     .locator('app-base-date-picker')
  127 |     .filter({ hasText: 'Return' })
  128 |     .getByPlaceholder('Select Date');
  129 |   await this.setDate(returnInput, returnDate);
  130 | }
  131 | 
  132 | 
  133 |  async fillMultiCity(
  134 |   legs: { from: string; to: string; departDate: number }[],
  135 | ) {
  136 |   // add segments لو محتاج
  137 |   for (let i = 1; i < legs.length; i++) {
  138 |     await this.page.getByRole('button', { name: 'Add Flight' }).click();
  139 |   }
  140 | 
  141 |   const fromInputs = this.page.getByPlaceholder("Departure City");
  142 |   const toInputs = this.page.getByPlaceholder("Destination City");
  143 |   const dateInputs = this.page.getByPlaceholder("Select Date");
  144 | 
  145 |   for (let i = 0; i < legs.length; i++) {
  146 |     await this.selectCity(fromInputs.nth(i), legs[i].from);
  147 |     await this.selectCity(toInputs.nth(i), legs[i].to);
  148 |     await this.setDate(dateInputs.nth(i), legs[i].departDate);
  149 |   }
  150 | }
  151 |   async search() {
  152 |     await this.searchButton.click();
  153 |   }
```
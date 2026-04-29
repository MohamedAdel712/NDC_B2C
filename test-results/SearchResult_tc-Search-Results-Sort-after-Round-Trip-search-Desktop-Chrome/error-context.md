# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: SearchResult_tc.spec.ts >> Search Results >> Sort after Round Trip search
- Location: tests\SearchResult_tc.spec.ts:16:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('combobox', { name: 'One Way' })
    - locator resolved to <span pc24="" pc25="" tabindex="0" role="combobox" id="bd-0b8g2bd" autofocus="true" aria-label="One Way" aria-disabled="false" aria-expanded="false" aria-required="false" aria-haspopup="listbox" data-pc-section="label" class="p-select-label ng-star-inserted">…</span>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

```

# Test source

```ts
  1   | import { Page, Locator } from "@playwright/test";
  2   | import { BasePage } from "./Base_Page";
  3   | import { ENV } from "../config/env";
  4   | import { SearchData } from "../types/search.types";
  5   | 
  6   | export class SearchPage extends BasePage {
  7   |   readonly txt_fromInput = this.page.getByPlaceholder("Departure City");
  8   |   readonly txt_toInput = this.page.getByPlaceholder("Destination City");
  9   |   readonly txt_dateInput = this.page.getByPlaceholder("Select Date");
  10  |   readonly btn_searchButton = this.page.getByRole("button", {
  11  |     name: "Go",
  12  |     exact: true,
  13  |   });
  14  |   readonly img_FLYWTLogo = this.page.getByAltText("Home");
  15  |   readonly link_MyBooking = this.page.getByRole("link", { name: "My Booking" });
  16  |   readonly btn_Home = this.page.getByRole("link", { name: "Home" });
  17  |   readonly dropdown_Currency = this.page.getByRole("combobox", {
  18  |     name: "Egyptian Pound",
  19  |   });
  20  |   readonly dropdown_TripType = this.page.getByRole("combobox", {
  21  |     name: "One Way",
  22  |   });
  23  |   readonly dropdown_CabinClass = this.page.getByRole("combobox", {
  24  |     name: "Economy",
  25  |   });
  26  |   readonly dropdown_open_Passenger = this.page.locator(
  27  |     ".passenger-select__btn-content",
  28  |   );
  29  |   readonly dropdown_Passenger_apply = this.page.getByRole("button", {
  30  |     name: "Apply",
  31  |   });
  32  | 
  33  |   async goto() {
  34  |     await this.navigate(ENV.BASE_URL);
  35  |   }
  36  |   // logo
  37  |   async FLYWTLogo() {
  38  |     await this.img_FLYWTLogo.click();
  39  |   }
  40  | 
  41  |   async clickMyBooking() {
  42  |     await this.link_MyBooking.click();
  43  |   }
  44  | 
  45  |   //homeButton
  46  |   async HomeButton() {
  47  |     await this.btn_Home.click();
  48  |   }
  49  | 
  50  |   //currency
  51  |   async selectCurrency(option: string) {
  52  |     await this.dropdown_Currency.click();
  53  |     await this.page.waitForSelector('li[role="option"]');
  54  | 
  55  |     const optionLocator = this.page.locator('li[role="option"]', {
  56  |       hasText: option,
  57  |     });
  58  |     await optionLocator.click();
  59  |   }
  60  | 
  61  |   //tripType
  62  |   async selectTripType(type: "One Way" | "Round Trip" | "Multi-City") {
> 63  |     await this.dropdown_TripType.click();
      |                                  ^ Error: locator.click: Target page, context or browser has been closed
  64  |     await this.page.getByRole("option", { name: type }).click();
  65  |   }
  66  | 
  67  |   async selectCity(input: Locator, city: string) {
  68  |     await input.waitFor({ state: "visible" });
  69  |     await input.click();
  70  |     await input.fill(city);
  71  |     const suggestion = this.page.getByRole("option", { name: city }).first();
  72  |     await suggestion.waitFor({ state: "visible" });
  73  |     await suggestion.click();
  74  |   }
  75  | 
  76  |   async openPassengerDropdown() {
  77  |     await this.dropdown_open_Passenger.click();
  78  |   }
  79  | 
  80  |   async incrementPassenger(type: string, count: number) {
  81  |     const row = this.page.locator(".passenger-row", { hasText: type });
  82  |     const plusBtn = row.locator("button.counter-btn").nth(1);
  83  |     const targetCount = type === "Adults" ? count - 1 : count;
  84  |     for (let i = 0; i < targetCount; i++) await plusBtn.click();
  85  |   }
  86  | 
  87  |   async applyPassengerSelection() {
  88  |     await this.dropdown_Passenger_apply.click();
  89  |   }
  90  | 
  91  |   async selectCabinClass(option: string) {
  92  |     await this.dropdown_CabinClass.click();
  93  |     await this.page.waitForSelector('li[role="option"]');
  94  |     const optionLocator = this.page.locator('li[role="option"]', {
  95  |       hasText: option,
  96  |     });
  97  |     await optionLocator.click();
  98  |   }
  99  | 
  100 |   async setDate(input: Locator, date: number) {
  101 |     const today = new Date();
  102 |     const targetDate = new Date(
  103 |       today.getFullYear(),
  104 |       today.getMonth(),
  105 |       today.getDate() + date,
  106 |     );
  107 |     const formatted = `${String(targetDate.getMonth() + 1).padStart(2, "0")}/${String(targetDate.getDate()).padStart(2, "0")}/${targetDate.getFullYear()}`;
  108 |     await input.click();
  109 |     await input.fill("");
  110 |     await input.type(formatted, { delay: 100 });
  111 |     await this.page.keyboard.press("Tab");
  112 |   }
  113 | 
  114 |   async fillOneWay(fromCity: string, toCity: string, departDate: number) {
  115 |     await this.selectCity(this.txt_fromInput, fromCity);
  116 |     await this.selectCity(this.txt_toInput, toCity);
  117 |     await this.setDate(this.txt_dateInput, departDate);
  118 |   }
  119 | 
  120 |   async fillRoundTrip(
  121 |     fromCity: string,
  122 |     toCity: string,
  123 |     departDate: number,
  124 |     returnDate: number,
  125 |   ) {
  126 |     await this.selectCity(this.txt_fromInput, fromCity);
  127 |     await this.selectCity(this.txt_toInput, toCity);
  128 | 
  129 |     const dateInputs = this.page.getByPlaceholder("Select Date");
  130 |     await this.setDate(dateInputs.nth(0), departDate);
  131 |     await this.setDate(dateInputs.nth(1), returnDate);
  132 |   }
  133 | 
  134 |   async fillMultiCity(
  135 |     legs: { from: string; to: string; departDate: number }[],
  136 |   ) {
  137 |     const fromInputs = this.page.getByPlaceholder("Departure City");
  138 |     const toInputs = this.page.getByPlaceholder("Destination City");
  139 |     const dateInputs = this.page.getByPlaceholder("Select Date");
  140 | 
  141 |     for (let i = 0; i < legs.length; i++) {
  142 |       if (i > 0) {
  143 |         await this.page.getByRole("button", { name: "Add A Flight" }).click();
  144 |         await fromInputs.nth(i).waitFor({ state: "visible" });
  145 |       }
  146 |       await this.selectCity(fromInputs.nth(i), legs[i].from);
  147 |       await this.selectCity(toInputs.nth(i), legs[i].to);
  148 |       await this.setDate(dateInputs.nth(i), legs[i].departDate);
  149 |     }
  150 |   }
  151 |   async search(data: SearchData) {
  152 |     await this.goto();
  153 |     if (data.currency) await this.selectCurrency(data.currency);
  154 |     await this.selectTripType(data.tripType);
  155 |     await this.openPassengerDropdown();
  156 |     if (data.Adults) await this.incrementPassenger("Adults", data.Adults);
  157 |     if (data.Children) await this.incrementPassenger("Children", data.Children);
  158 |     if (data.Infants) await this.incrementPassenger("Infants", data.Infants);
  159 |     await this.applyPassengerSelection();
  160 |     if (data.class) await this.selectCabinClass(data.class);
  161 | 
  162 |     if (data.tripType === "One Way")
  163 |       await this.fillOneWay(data.from!, data.to!, data.departDate!);
```
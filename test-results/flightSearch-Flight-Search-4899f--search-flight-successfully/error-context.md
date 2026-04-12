# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flightSearch.spec.ts >> Flight Search >> User can search flight successfully
- Location: tests\flightSearch.spec.ts:113:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Add Flight' })

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e6]:
    - navigation [ref=e7]:
      - text: 
      - img "Home" [ref=e10] [cursor=pointer]
      - generic [ref=e11]:
        - link "Home" [ref=e12] [cursor=pointer]:
          - /url: /en
        - link "My Booking" [ref=e13] [cursor=pointer]:
          - /url: /en/booking/my-booking
        - generic [ref=e14] [cursor=pointer]: العربية
        - generic [ref=e20] [cursor=pointer]:
          - combobox "US Dollar" [ref=e21]:
            - generic [ref=e22]:
              - generic [ref=e23]: USD
              - img "US Dollar flag" [ref=e24]
          - button "dropdown trigger" [ref=e25]:
            - generic [ref=e26]: 
  - main [ref=e27]:
    - generic [ref=e28]:
      - generic [ref=e33]:
        - heading "Book your next adventure in minutes with the best prices" [level=1] [ref=e39]:
          - text: Book your next adventure in
          - text: minutes with the best prices
        - generic [ref=e41]:
          - generic [ref=e42]:
            - generic [ref=e45] [cursor=pointer]:
              - combobox "Multi-City" [ref=e46]
              - button "dropdown trigger" [ref=e47]:
                - generic [ref=e48]: 
            - button "13 Passengers " [ref=e51] [cursor=pointer]:
              - generic [ref=e52]:
                - generic [ref=e53]: 13 Passengers
                - generic [ref=e54]: 
            - generic [ref=e57] [cursor=pointer]:
              - combobox "Business" [active] [ref=e58]
              - button "dropdown trigger" [ref=e59]:
                - generic [ref=e60]: 
          - generic [ref=e64]:
            - generic [ref=e65]:
              - generic [ref=e66]:
                - generic [ref=e72]:
                  - generic [ref=e74]:
                    - generic [ref=e80]:
                      - generic [ref=e81]: From
                      - generic [ref=e82]:
                        - generic:
                          - generic: 
                        - combobox "From" [ref=e86]
                    - generic "Swap departure and destination" [ref=e87]:
                      - button [ref=e89] [cursor=pointer]:
                        - img [ref=e91]
                    - generic [ref=e98]:
                      - generic [ref=e99]: To
                      - generic [ref=e100]:
                        - generic:
                          - generic: 
                        - combobox "To" [ref=e104]
                  - generic [ref=e110]:
                    - generic [ref=e111]: Departure
                    - generic [ref=e112]:
                      - button "Open calendar" [ref=e113] [cursor=pointer]:
                        - img [ref=e114]
                      - combobox "Departure" [ref=e119]
                      - button "Open calendar" [ref=e121] [cursor=pointer]:
                        - img [ref=e122]
                - generic [ref=e129]:
                  - generic [ref=e131]:
                    - generic [ref=e137]:
                      - generic [ref=e138]: From
                      - generic [ref=e139]:
                        - generic:
                          - generic: 
                        - combobox "From" [ref=e143]
                    - generic "Swap departure and destination" [ref=e144]:
                      - button [ref=e146] [cursor=pointer]:
                        - img [ref=e148]
                    - generic [ref=e155]:
                      - generic [ref=e156]: To
                      - generic [ref=e157]:
                        - generic:
                          - generic: 
                        - combobox "To" [ref=e161]
                  - generic [ref=e167]:
                    - generic [ref=e168]: Departure
                    - generic [ref=e169]:
                      - button "Open calendar" [ref=e170] [cursor=pointer]:
                        - img [ref=e171]
                      - combobox "Departure" [ref=e176]
                      - button "Open calendar" [ref=e178] [cursor=pointer]:
                        - img [ref=e179]
              - button "Go" [ref=e183] [cursor=pointer]
            - button "Add A Flight" [ref=e187] [cursor=pointer]:
              - img [ref=e189]
              - generic [ref=e191]: Add A Flight
      - generic [ref=e195]:
        - generic [ref=e196]:
          - heading "Latest Flight Deals" [level=2] [ref=e197]
          - paragraph [ref=e198]: Looking for inspiration for your next trip? These are todays best flight deals.
        - generic [ref=e201]:
          - generic [ref=e202]:
            - generic:
              - generic [ref=e206]:
                - generic [ref=e207]:
                  - heading "Cairo" [level=3] [ref=e208]
                  - img [ref=e209]
                  - heading "Dubai" [level=3] [ref=e211]
                - generic [ref=e212]:
                  - generic [ref=e214]: 143.09 USD
                  - button "Book Now" [ref=e215] [cursor=pointer]
              - generic [ref=e219]:
                - generic [ref=e220]:
                  - heading "Cairo" [level=3] [ref=e221]
                  - img
                  - heading "Jeddah" [level=3] [ref=e223]
                - generic [ref=e224]:
                  - generic [ref=e226]: 143.09 USD
                  - button "Book Now" [ref=e227] [cursor=pointer]
              - generic [ref=e231]:
                - generic [ref=e232]:
                  - heading "Cairo" [level=3] [ref=e233]
                  - img [ref=e234]
                  - heading "Riyadh" [level=3] [ref=e236]
                - generic [ref=e237]:
                  - generic [ref=e239]: 143.09 USD
                  - button "Book Now" [ref=e240] [cursor=pointer]
              - generic [ref=e244]:
                - generic [ref=e245]:
                  - heading "Jeddah" [level=3] [ref=e246]
                  - img
                  - heading "Dubai" [level=3] [ref=e248]
                - generic [ref=e249]:
                  - generic [ref=e251]: 143.09 USD
                  - button "Book Now" [ref=e252] [cursor=pointer]
              - generic [ref=e256]:
                - generic [ref=e257]:
                  - heading "Dubai" [level=3] [ref=e258]
                  - img [ref=e259]
                  - heading "Cairo" [level=3] [ref=e261]
                - generic [ref=e262]:
                  - generic [ref=e264]: 143.09 USD
                  - button "Book Now" [ref=e265] [cursor=pointer]
          - button "Previous slide" [ref=e266] [cursor=pointer]:
            - img
          - button "Next slide" [ref=e267] [cursor=pointer]:
            - img
  - contentinfo [ref=e269]:
    - generic [ref=e271]:
      - generic [ref=e272]:
        - paragraph [ref=e273]: Have Questions?
        - paragraph [ref=e274]: "19359"
        - paragraph [ref=e275]: Customercare@flywt.com
        - paragraph [ref=e276]: 24/7 Dedicated Customer Support
      - paragraph [ref=e278]: Your personal details are 100% secured with us
      - paragraph [ref=e281]: Like this? love this? spread the word
```

# Test source

```ts
  40  |     await this.page.waitForSelector('li[role="option"]');
  41  | 
  42  |     const optionLocator = this.page.locator('li[role="option"]', {
  43  |       hasText: option,
  44  |     });
  45  |     await optionLocator.click();
  46  |   }
  47  | 
  48  | 
  49  | 
  50  |   //tripType
  51  |   async selectTripType(type: 'One Way' | 'Round Trip' | 'Multi-City') {
  52  |     await this.page.getByRole('combobox', { name: 'One Way' }).click();
  53  |     await this.page.getByRole('option', { name: type }).click();
  54  |   }
  55  | 
  56  |   async selectCity(input: Locator, city: string) {
  57  |     await input.click();
  58  |     await input.fill(city);
  59  |     await this.page.getByText(city).first().click();
  60  |   }
  61  | 
  62  | 
  63  |   //ADD PASSENGER
  64  |   async openPassengerDropdown() {
  65  |     await this.page.locator(".passenger-select__btn-content").click();
  66  |   }
  67  | 
  68  |   async incrementPassenger(type: string, count: number) {
  69  |     const row = this.page.locator(".passenger-row", { hasText: type });
  70  |     const plusBtn = row.locator("button.counter-btn").nth(1);
  71  |     const targetCount = type === "Adults" ? count - 1 : count;
  72  |     for (let i = 0; i < targetCount; i++) await plusBtn.click();
  73  |   }
  74  | 
  75  |   async applyPassengerSelection() {
  76  |     await this.page.getByRole("button", { name: "Apply" }).click();
  77  |   }
  78  | 
  79  |  
  80  | 
  81  | //cabin class
  82  |  async selectCabinClass(option: string) {
  83  |     const cabinDropdown = this.page.locator(
  84  |       'app-base-dropdown[label="Cabin class"] span[role="combobox"]',
  85  |     );
  86  |     await cabinDropdown.click();
  87  |     await this.page.getByRole("option", { name: option }).click();
  88  |   }
  89  | 
  90  | 
  91  |   async setDate(input: Locator, date: number) {
  92  |     const today = new Date();
  93  |     const targetDate = new Date(
  94  |       today.getFullYear(),
  95  |       today.getMonth(),
  96  |       today.getDate() + date,
  97  |     );
  98  |     const formatted = `${String(targetDate.getMonth() + 1).padStart(2, "0")}/${String(targetDate.getDate()).padStart(2, "0")}/${targetDate.getFullYear()}`;
  99  |     await input.click();
  100 |     await input.fill("");
  101 |     await input.type(formatted, { delay: 100 });
  102 |     await this.page.keyboard.press("Tab");
  103 |   }
  104 | 
  105 |   async fillOneWay(fromCity: string, toCity: string, departDate: number) {
  106 |     await this.selectCity(this.fromInput, fromCity);
  107 |     await this.selectCity(this.toInput, toCity);
  108 |     await this.setDate(this.dateInput, departDate);
  109 |   }
  110 | 
  111 |  async fillRoundTrip(
  112 |   fromCity: string,
  113 |   toCity: string,
  114 |   departDate: number,
  115 |   returnDate: number,
  116 | ) {
  117 |   await this.selectCity(this.fromInput, fromCity);
  118 |   await this.selectCity(this.toInput, toCity);
  119 | 
  120 |   // Departure date
  121 |   const departureInput = this.page
  122 |     .locator('app-base-date-picker')
  123 |     .filter({ hasText: 'Departure' })
  124 |     .getByPlaceholder('Select Date');
  125 |   await this.setDate(departureInput, departDate);
  126 | 
  127 |   // Return date
  128 |   const returnInput = this.page
  129 |     .locator('app-base-date-picker')
  130 |     .filter({ hasText: 'Return' })
  131 |     .getByPlaceholder('Select Date');
  132 |   await this.setDate(returnInput, returnDate);
  133 | }
  134 | 
  135 | 
  136 |  async fillMultiCity(
  137 |   legs: { from: string; to: string; departDate: number }[],
  138 |  ){
  139 |   for (let i = 1; i < legs.length; i++) {
> 140 |     await this.page.getByRole('button', { name: 'Add Flight' }).click();
      |                                                                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  141 |   }
  142 | 
  143 |   const fromInputs = this.page.getByPlaceholder("Departure City");
  144 |   const toInputs = this.page.getByPlaceholder("Destination City");
  145 |   const dateInputs = this.page.getByPlaceholder("Select Date");
  146 | 
  147 |   for (let i = 0; i < legs.length; i++) {
  148 |     await this.selectCity(fromInputs.nth(i), legs[i].from);
  149 |     await this.selectCity(toInputs.nth(i), legs[i].to);
  150 |     await this.setDate(dateInputs.nth(i), legs[i].departDate);
  151 |   }
  152 | }
  153 |   async search() {
  154 |     await this.searchButton.click();
  155 |   }
  156 | }
  157 | 
```
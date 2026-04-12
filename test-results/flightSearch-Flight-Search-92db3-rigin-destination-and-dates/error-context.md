# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flightSearch.spec.ts >> Flight Search >> User can fill origin, destination and dates
- Location: tests\flightSearch.spec.ts:79:7

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
          - combobox "Egyptian Pound" [ref=e21]:
            - generic [ref=e22]:
              - generic [ref=e23]: EGP
              - img "Egyptian Pound flag" [ref=e24]
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
              - combobox "One Way" [ref=e46]
              - button "dropdown trigger" [ref=e47]:
                - generic [ref=e48]: 
            - button "1 Passenger " [ref=e51] [cursor=pointer]:
              - generic [ref=e52]:
                - generic [ref=e53]: 1 Passenger
                - generic [ref=e54]: 
            - generic [ref=e57] [cursor=pointer]:
              - combobox "Economy" [ref=e58]
              - button "dropdown trigger" [ref=e59]:
                - generic [ref=e60]: 
          - generic [ref=e65]:
            - generic [ref=e72]:
              - generic [ref=e74]:
                - generic [ref=e80]:
                  - generic [ref=e81]: From
                  - generic [ref=e82]:
                    - generic:
                      - generic: 
                    - combobox "From" [ref=e86]
                - generic "Swap departure and destination" [ref=e87]:
                  - button [active] [ref=e89] [cursor=pointer]:
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
            - button "Go" [ref=e126] [cursor=pointer]
      - generic [ref=e130]:
        - generic [ref=e131]:
          - heading "Latest Flight Deals" [level=2] [ref=e132]
          - paragraph [ref=e133]: Looking for inspiration for your next trip? These are todays best flight deals.
        - generic [ref=e136]:
          - generic [ref=e137]:
            - generic:
              - generic [ref=e141]:
                - generic [ref=e142]:
                  - heading "Cairo" [level=3] [ref=e143]
                  - img [ref=e144]
                  - heading "Dubai" [level=3] [ref=e146]
                - generic [ref=e147]:
                  - generic [ref=e149]: 7,014.07 EGP
                  - button "Book Now" [ref=e150] [cursor=pointer]
              - generic [ref=e154]:
                - generic [ref=e155]:
                  - heading "Cairo" [level=3] [ref=e156]
                  - img
                  - heading "Jeddah" [level=3] [ref=e158]
                - generic [ref=e159]:
                  - generic [ref=e161]: 7,014.07 EGP
                  - button "Book Now" [ref=e162] [cursor=pointer]
              - generic [ref=e166]:
                - generic [ref=e167]:
                  - heading "Cairo" [level=3] [ref=e168]
                  - img [ref=e169]
                  - heading "Riyadh" [level=3] [ref=e171]
                - generic [ref=e172]:
                  - generic [ref=e174]: 7,014.07 EGP
                  - button "Book Now" [ref=e175] [cursor=pointer]
              - generic [ref=e179]:
                - generic [ref=e180]:
                  - heading "Jeddah" [level=3] [ref=e181]
                  - img
                  - heading "Dubai" [level=3] [ref=e183]
                - generic [ref=e184]:
                  - generic [ref=e186]: 7,014.07 EGP
                  - button "Book Now" [ref=e187] [cursor=pointer]
              - generic [ref=e191]:
                - generic [ref=e192]:
                  - heading "Dubai" [level=3] [ref=e193]
                  - img [ref=e194]
                  - heading "Cairo" [level=3] [ref=e196]
                - generic [ref=e197]:
                  - generic [ref=e199]: 7,014.07 EGP
                  - button "Book Now" [ref=e200] [cursor=pointer]
          - button "Previous slide" [ref=e201] [cursor=pointer]:
            - img
          - button "Next slide" [ref=e202] [cursor=pointer]:
            - img
  - contentinfo [ref=e204]:
    - generic [ref=e206]:
      - generic [ref=e207]:
        - paragraph [ref=e208]: Have Questions?
        - paragraph [ref=e209]: "19359"
        - paragraph [ref=e210]: Customercare@flywt.com
        - paragraph [ref=e211]: 24/7 Dedicated Customer Support
      - paragraph [ref=e213]: Your personal details are 100% secured with us
      - paragraph [ref=e216]: Like this? love this? spread the word
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
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flightSearch.spec.ts >> Flight Search >> User can select cabin class
- Location: tests\flightSearch.spec.ts:66:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://ndc-b2c-frontend-stg-app.azurewebsites.net/en", waiting until "load"

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
  1  | 
  2  | import { Page } from '@playwright/test';
  3  | 
  4  | export class BasePage {
  5  | 
  6  |   readonly page: Page;
  7  | 
  8  |   constructor(page: Page) {
  9  |     this.page = page;
  10 |   }
  11 | 
  12 |   async navigate(url: string) {
> 13 |     await this.page.goto(url);
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  14 |   }
  15 | 
  16 | }
  17 | 
```
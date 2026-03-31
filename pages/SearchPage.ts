import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../config/env';

export class SearchPage extends BasePage {
  readonly fromInput: Locator;
  readonly toInput: Locator;
  readonly dateInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);

    this.fromInput = page.getByPlaceholder('Departure City');
    this.toInput = page.getByPlaceholder('Destination City');
    this.dateInput = page.getByPlaceholder('Select Date');
    this.searchButton = page.getByRole('button', { name: 'Go' });
  }

  // ENV
  async goto() {
    await this.navigate(ENV.BASE_URL);
  }

  // FLYWT LOGO
  async FLYWTLogo() {
    const logo = this.page.getByAltText('Home');
    await logo.click();
  }

  // Home Button
  async HomeButton() {
    await this.page.getByRole('link', { name: 'Home' }).click();
  }

  // Currency
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

  // Trip Type
  async selectTripType(type: 'One Way' | 'Round Trip' | 'Multi-City') {
    await this.page.getByRole('combobox', { name: 'One Way' }).click();
    await this.page.getByRole('option', { name: type }).click();
  }

  // Passenger Counter
  async openPassengerDropdown() {
    const passengerBtn = this.page.locator('.passenger-select__btn-content');
    await passengerBtn.click();
  }

  async incrementPassenger(type: string, count: number) {
    const row = this.page.locator('.passenger-row', { hasText: type });
    const plusBtn = row.locator('button.counter-btn').nth(1);

    const targetCount = type === 'Adults' ? count - 1 : count;

    for (let i = 0; i < targetCount; i++) {
      await plusBtn.click();
    }
  }

  async decrementPassenger(type: string, count: number) {
    const row = this.page.locator('.passenger-row', { hasText: type });
    const minusBtn = row.locator('button.counter-btn').nth(0);

    const targetCount = type === 'Adults' ? count - 1 : count;

    for (let i = 0; i < targetCount; i++) {
      await minusBtn.click();
    }
  }

  async applyPassengerSelection() {
    const applyBtn = this.page.getByRole('button', { name: 'Apply' });
    await applyBtn.click();
  }

  // Cabin Class
  async selectCabinClass(option: string) {
    const cabinDropdown = this.page.locator(
      'app-base-dropdown[label="Cabin class"] span[role="combobox"]'
    );
    await cabinDropdown.click();

    const optionLocator = this.page.locator('li[role="option"]', {
      hasText: option,
    });
    await optionLocator.click();
  }

  // Search Criteria
  async selectFrom(city: string) {
    await this.fromInput.click();
    await this.fromInput.fill(city);
    await this.page.getByText(city).first().click();
  }

  async selectTo(city: string) {
    await this.toInput.click();
    await this.toInput.fill(city);
    await this.page.getByText(city).first().click();
  }

  async setDateFromToday(daysAhead: number): Promise<void> {
    const today = new Date();

    const targetDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysAhead
    );

    const day = String(targetDate.getDate()).padStart(2, '0');
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const year = targetDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`; // FIX

    console.log('Expected Date:', formattedDate);

    await this.dateInput.click();
    await this.dateInput.fill('');
    await this.dateInput.type(formattedDate, { delay: 100 });
    await this.page.keyboard.press('Tab');
  }

  // Search Button
  async search() {
    await this.searchButton.click();
  }
}
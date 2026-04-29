import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base_Page";
import { ENV } from "../config/env";

export class SearchResultPage extends BasePage {
 
//sorting
readonly btn_cheapest = this.page.getByRole("button", { name: "Cheapest" });
readonly btn_fastest = this.page.getByRole("button", { name: "Fastest" });
readonly btn_recommended = this.page.getByRole("button", { name: "Recommended" });




async sortBy(option: "Cheapest" | "Fastest" | "Recommended") {
  const sortingOptions: Record<string, Locator> = {
    "Cheapest": this.btn_cheapest,
    "Fastest": this.btn_fastest,
    "Recommended": this.btn_recommended,
  };

  const button = sortingOptions[option];
  if (button) {
    await button.click();
  }
}























}
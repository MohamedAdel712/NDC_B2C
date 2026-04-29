import { test as base, expect } from "@playwright/test";
import { SearchPage } from "../pages/Search_Page";
import { SearchResultPage } from "../pages/SearchResult_Page";

/**
 * Fixtures are responsible for providing ready-to-use page objects only.
 * State setup (navigation, form filling) belongs in the test or a flow helper.
 */
type AppFixtures = {
  searchPage: SearchPage;
  searchResultPage: SearchResultPage;
};

export const test = base.extend<AppFixtures>({
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },

  searchResultPage: async ({ page }, use) => {
    await use(new SearchResultPage(page));
  },
});

export { expect };

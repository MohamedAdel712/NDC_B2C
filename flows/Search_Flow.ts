import { Page } from "@playwright/test";
import { SearchPage } from "../pages/Search_Page";
import { SearchResultPage } from "../pages/SearchResult_Page";
import { SearchData, SortOption } from "../types/search.types";

export async function searchFlight(page: Page, data: SearchData) {
  const searchPage = new SearchPage(page);
  await searchPage.search(data);
}

export async function searchAndSort(
  page: Page,
  data: SearchData,
  sortOption: SortOption,
) {
  await searchFlight(page, data);
  const searchResultPage = new SearchResultPage(page);
  await searchResultPage.sortBy(sortOption);
}

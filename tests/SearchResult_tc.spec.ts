import { test, expect } from "../fixtures/search.fixture";
import OneWay_data from "../test-data/OneWay_data.json";
import RoundTrip_data from "../test-data/RoundTrip_data.json";
import searchResultData from "../test-data/SearchResultData.json";
import { SearchData, SortOption } from "../types/search.types";

test.describe("Search Results", () => {
  test("Sort after One Way search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(OneWay_data as SearchData);
    await searchResultPage.sortBy(searchResultData.sortBy as SortOption);
  });

  test("Sort after Round Trip search", async ({
    searchPage,
    searchResultPage,
  }) => {
    await searchPage.search(RoundTrip_data as SearchData);
    await searchResultPage.sortBy(searchResultData.sortBy as SortOption);
  });
});

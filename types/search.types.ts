export type TripType = "One Way" | "Round Trip" | "Multi-City";

export type CabinClass = "Economy" | "Business" | "First";

export type SortOption = "Cheapest" | "Fastest" | "Recommended";

export type StopsFilter = "Nonstop" | "1 Stop" | "2+ Stops";

export type TimeFilter = "Morning" | "Afternoon" | "Evening" | "Night";

export type DurationFilter = "Short" | "Medium" | "Long";

export interface PriceRange {
  min: number;
  max: number;
}

export interface Filters {
  stops?: StopsFilter;
  departureTime?: TimeFilter;
  duration?: DurationFilter;
  priceRange?: PriceRange;
  baggageIncluded?: boolean;
}

export interface Leg {
  from: string;
  to: string;
  departDate: number;
}

export interface SearchData {
  tripType: TripType;
  currency?: string;
  from?: string;
  to?: string;
  departDate?: number;
  returnDate?: number;
  legs?: Leg[];
  Adults?: number;
  Children?: number;
  Infants?: number;
  class?: string;
}

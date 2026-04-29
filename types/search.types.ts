export type TripType = "One Way" | "Round Trip" | "Multi-City";

export type CabinClass = "Economy" | "Business" | "First";

export type SortOption = "Cheapest" | "Fastest" | "Recommended";

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

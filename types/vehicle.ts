export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;

  price: number;        // MSRP
  cityMpg: number;
  highwayMpg: number;
  cargo: number;        // cu ft
  horsepower: number;
  safetyRating: number; // 1-5
}

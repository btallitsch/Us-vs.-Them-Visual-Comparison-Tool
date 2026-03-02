export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;

  price: number;        // lower is better
  cityMpg: number;      // higher is better
  highwayMpg: number;   // higher is better
  cargo: number;        // cubic feet, higher better
  horsepower: number;   // higher better
  safetyRating: number; // 1–5 scale, higher better
}

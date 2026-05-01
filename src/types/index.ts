export type FeatureLevel = 'standard' | 'available' | 'none';

export interface Vehicle {
  id: string;
  name: string;
  trim: string;
  segment: 'CPO' | 'NEW';
  priceLow: number;
  priceHigh: number;
  cargoMax: number;
  cargoBehind: number;
  awd: 'standard' | 'available' | 'none';
  warranty: string;
  topPick?: boolean;
  note: string;
  images: {
    exterior?: string;
    interior?: string;
    rear?: string;
  };
  manufacturerUrl: string;
  searchUrlSlug: { make: string; model: string };
  safety: {
    suite: string;
    standard: string[];
    available: string[];
  };
  tech: {
    standard: string[];
    available: string[];
  };
  comfort: {
    standard: string[];
    available: string[];
  };
  specs: {
    mpg: string;
    horsepower: number;
    seating: number;
    towingLb: number;
    groundClearanceIn: number;
  };
}

export interface SavedBuild {
  id: string;
  vehicleId: string;
  trim: string;
  price: number;
  apr: number;
  termMonths: number;
  downPayment: number;
  notes: string;
  createdAt: number;
}

export interface ChecklistState {
  [stepId: string]: boolean;
}

export interface UserProfile {
  zip: string;
  creditScore?: number;
  preApprovalApr?: number;
  monthlyBudget: number;
}

export interface LotFind {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  mileage?: number;
  price: number;
  awd?: boolean;
  color?: string;
  stockNumber?: string;
  vehicleHistory?: 'clean' | 'accident' | 'unknown';
  notes?: string;
  thumbsUp?: boolean;
  thumbsDown?: boolean;
  createdAt: number;
}

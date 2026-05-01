// Types
export interface Subscription {
  id: number;
  user_id: number;
  product_id: string;
  package_name: string;
  platform: string;
  price: number;
  status: string; // e.g. "active", "expired", etc. (consider using a union type or enum)
  ends_at: string; // ISO date string
  created_at: string; // ISO date string
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  initials: string | null | any;
  street: string | null | any;
  city: string | null | any;
  state: string | null | any;
  zip_code: string | null | any;
  profile_photo: string | null | any;
  phone: string | null | any;
  address: string | null | any;
  subscription?: Subscription;
  
}

export interface PreferencesContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  getUserLoading: boolean;
}

// Default Values
export const defaultContext: PreferencesContextType = {
  user: null,
  setUser: () => {},
  getUserLoading: false,
};

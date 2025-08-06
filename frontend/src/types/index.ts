export interface User {
  id: number | null;
  userType: "ajudante" | "ajudado" | "default";
  name: string;
  email: string;
}

export interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export interface RegisteredPerson {
  id: number;
  name: string;
  age: number;
  profileImageUrl: string;
  aboutYou: string;
  birthDate?: string;
}

export interface CarouselItem {
  name: string;
  age: number;
  img: string;
  description: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  city: string;
  neighborhood: string;
}

export interface FormValues {
  name: string;
  birthDate: string;
  dob: string; // Alias for birthDate used in validation
  rg: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  availableDays: string[];
  address: Address;
  userType: string;
  aboutYou: string;
  skills?: string;
  needs?: string;
}

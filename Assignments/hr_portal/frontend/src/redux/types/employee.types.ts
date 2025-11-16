export type UserRole = "Admin" | "Editor" | "Viewer";

export interface Address {
  street: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
}

export interface Employee {
  _id?: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  role: UserRole;
  isActive: boolean;
  skills: string[];
  availableSlots: string[];
  address: Address;
  company: Company;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeFormData {
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  role: UserRole;
  isActive: boolean;
  skills: string[];
  street: string;
  city: string;
  zipcode: string;
  company: string;
  availableSlots: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  customerId: string;
  amount: number;
  date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface SalesByDay {
  date: string;
  total: number;
}

export interface CustomerStat {
  id: string;
  name: string;
  value: number;
  label: string;
}

export interface CustomerFilters {
  name: string;
  email: string;
}
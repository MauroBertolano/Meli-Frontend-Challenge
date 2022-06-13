export interface Price {
  currency: String;
  amount: number;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  freeShipping: boolean;
  address?: string;
  description?: string;
  soldQuantity?: number;
  availableQuantity?: number;
}

export interface Description {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  freeShipping: boolean;
  address: string;
}

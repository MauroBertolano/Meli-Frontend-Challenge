export interface ItemsResponse {
  results: ItemResponse[];
  filters: Filter[];
}

interface Shipping {
  free_shipping: boolean;
}

interface Address {
  city_name: string;
}

interface Attribute {
  id: string;
  value_name: string;
}

export interface ItemResponse {
  id: string;
  title: string;
  currency_id: string;
  price: number;
  thumbnail: string;
  condition: string;
  shipping: Shipping;
  address: Address;
  category_id: string;
  attributes: Attribute[];
  sold_quantity: number;
  available_quantity: number;
}

interface Path {
  id: string;
  name: string;
}

interface FilterValue {
  id: string;
  name: string;
  path_from_root: Path[];
}

interface Filter {
  id: string;
  name: string;
  type: string;
  values: FilterValue[];
}

export interface CategoriesResponse {
  path_from_root: Path[];
}

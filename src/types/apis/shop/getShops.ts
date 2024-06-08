export interface GetShopResponse {
  item: ShopTypesItem;
  links: Link[];
}

export interface ShopTypesItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user: User;
}

export interface User {
  item: UserItem;
  href: string;
}

export interface UserItem {
  id: string;
  email: string;
  type: string;
}

export interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
  body?: Body;
  query?: Query;
}

export interface Body {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: string;
}

export interface Query {
  offset: string;
  limit: string;
}

export interface GetShopResponse {
  item: ShopTypesItem;
  links: Link[];
}

interface ShopTypesItem {
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

interface User {
  item: UserItem;
  href: string;
}

interface UserItem {
  id: string;
  email: string;
  type: string;
}

interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
  body?: Body;
  query?: Query;
}

interface Body {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: string;
}

interface Query {
  offset: string;
  limit: string;
}

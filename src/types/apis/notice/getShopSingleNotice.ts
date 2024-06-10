export interface GetShopsSingleNoticeResponse {
  item: GetShopsSingleNoticeItem;
  links: Link[];
}

interface GetShopsSingleNoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: Date;
  workhour: number;
  description: string;
  closed: boolean;
  shop: Shop;
  currentUserApplication: null;
}

interface Shop {
  item: ShopItem;
  href: string;
}

interface ShopItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
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
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

interface Query {
  offset: string;
  limit: string;
}

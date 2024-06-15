// types.ts
export interface UserResponse {
  count: number;
  hasNext: boolean;
  items: Item[];
  limit: number;
  links: Link[];
  offset: number;
}

export interface Item {
  item: NoticeItem;
  links: Link[];
}

export interface NoticeItem {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  shop: Shop;
  notice: Notice;
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

interface Notice {
  item: NoticeDetails;
}

interface NoticeDetails {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

interface Link {
  rel: string;
  href: string;
}

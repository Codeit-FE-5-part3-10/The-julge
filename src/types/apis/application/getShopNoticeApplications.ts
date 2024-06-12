export interface getShopNoticeApplicationsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: ItemElement[];
  links: Link[];
}

export interface ItemElement {
  item: ItemItem;
  links: Link[];
}

export interface ItemItem {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  user: User;
  shop: Shop;
  notice: Notice;
}

interface Notice {
  item: NoticeItem;
  href: string;
}

interface NoticeItem {
  id: string;
  hourlyPay: number;
  description: string;
  startsAt: string;
  workhour: number;
  closed: boolean;
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

interface User {
  item: UserItem;
  href: string;
}

interface UserItem {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

interface Link {
  rel: string;
  description: string;
  method: string;
  href: string;
  body?: Body;
}

interface Body {
  status: string;
}

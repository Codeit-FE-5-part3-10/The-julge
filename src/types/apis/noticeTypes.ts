export interface ItemElement {
  item: ItemItem;
  links: Link[];
}

export interface ItemItem {
  id: string;
  hourlyPay: number;
  startsAt: Date;
  workhour: number;
  description: string;
  closed: boolean;
  shop: Shop;
}

export interface Shop {
  item: ShopItem;
  href: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: Category;
  address1: Address1;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export enum Address1 {
  서울시용산구 = '서울시 용산구',
  서울시중구 = '서울시 중구',
}

export enum Category {
  중식 = '중식',
  한식 = '한식',
}

export interface Link {
  rel: Rel;
  description: string;
  method: Method;
  href: string;
}

export enum Method {
  Get = 'GET',
}

export enum Rel {
  Next = 'next',
  Prev = 'prev',
  Self = 'self',
  Shop = 'shop',
}

export type GetNoticesRequest = Partial<{
  offset: number;
  limit: number;
  address: string;
  keyword: string;
  startsAtGte: string;
  hourlyPayGte: number;
  sort: 'time' | 'pay' | 'hour' | 'shop';
}>;

export type GetNoticesResponse = {
  offset: number;
  limit: number;
  address: any[];
  count: number;
  hasNext: boolean;
  items: ItemElement[];
  links: Link[];
};

export type PostNoticeRequest = {
  shopId: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};

export type PostNoticeResponse = {
  message: string;
};

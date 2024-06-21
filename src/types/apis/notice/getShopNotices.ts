export interface GetShopNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: ItemElement[];
  links: Link[];
}

interface ItemElement {
  item: ItemItem;
  links: Link[];
}

interface ItemItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface Link {
  rel?: string;
  description: string;
  method: string;
  href: string;
  body?: Body;
  ref?: string;
}

interface Body {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

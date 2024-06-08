export interface GetShopsNoticesResponse {
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
  hourlyPay: number;
  startsAt: Date;
  workhour: number;
  description: string;
  closed: boolean;
}

export interface Link {
  rel?: string;
  description: string;
  method: string;
  href: string;
  body?: Body;
  ref?: string;
}

export interface Body {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
}

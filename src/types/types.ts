type shop = {
  item: {
    id: string;
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
  href: string;
};

type notice = {
  item: {
    id: string;
    hourlyPay: number;
    description: string;
    startsAt: string;
    workhour: number;
    closed: boolean;
  };
  href: string;
};

type user = {
  item: {
    id: string;
    email: string;
    type: 'employer' | 'employee';
    name?: string;
    phone?: string;
    address?: string;
    bio?: string;
  };
  href: string;
};

type link = {
  rel: string;
  description: string;
  method: string;
  href: string;
  body: { status: 'accepted' | 'rejected' };
};

type item = {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  user?: user;
  shop: shop;
  notice: notice;
};

export type items = {
  item: item;
  links: link[];
}[];

// 1. 가게의 특정 공고의 지원 목록 조회
// GET /shops/{shop_id}/notices/{notice_id}/applications
export interface applicationsByShopByNotice {
  offset?: number;
  limit?: number;
  count: number;
  hasNext: boolean;
  items: items;
  links: link[];
}

// 4. 유저의 지원목록
// GET /users/{user_id}/applications
export interface applicationsByUser {
  offset?: number;
  limit?: number;
  count: number; // 전체 개수
  hasNext: boolean; // 다음 내용 존재 여부
  items: items;
  links: link[];
}

export type allType = applicationsByShopByNotice | applicationsByUser;

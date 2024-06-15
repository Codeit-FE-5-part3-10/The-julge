export interface GetShopResponse {
  item: ShopTypesItem;
  links: Link[];
}

interface ShopTypesItem {
  id: string;
  name: string;
  category: Category;
  address1: Address;
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
  email?: string;
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
  address1: Address;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface Query {
  offset: undefined | number;
  limit: undefined | number;
}

type Category = '한식' | '중식' | '일식' | '양식' | '분식' | '카페' | '편의점' | '기타';

type Address =
  | '서울시 종로구'
  | '서울시 중구'
  | '서울시 용산구'
  | '서울시 성동구'
  | '서울시 광진구'
  | '서울시 동대문구'
  | '서울시 중랑구'
  | '서울시 성북구'
  | '서울시 강북구'
  | '서울시 도봉구'
  | '서울시 노원구'
  | '서울시 은평구'
  | '서울시 서대문구'
  | '서울시 마포구'
  | '서울시 양천구'
  | '서울시 강서구'
  | '서울시 구로구'
  | '서울시 금천구'
  | '서울시 영등포구'
  | '서울시 동작구'
  | '서울시 관악구'
  | '서울시 서초구'
  | '서울시 강남구'
  | '서울시 송파구'
  | '서울시 강동구';

export interface postShopRequest {
  name: string;
  category: Category;
  address1: Address;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface PostShopResponse {
  item: PostShopItem;
  links: Link[];
}

export interface PostShopItem {
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

type Category = '한식' | '중식' | '일식' | '양식' | '분식' | '카페' | '편의점' | '기타' | '';

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
  | '서울시 강동구'
  | '';

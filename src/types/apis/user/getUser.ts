//2. 내 정보 조회
export interface GetUserRequest {
  item: any;
  user_id: string;
}

// 전체 데이터 구조 타입 정의
export interface GetUserResponse {
  item: UserItem;
}

// UserItem 타입 정의
export interface UserItem {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: Shop;
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

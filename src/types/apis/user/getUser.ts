//2. 내 정보 조회
export interface GetUserResponse {
  item: any;
  user_id: string;
}

// 전체 데이터 구조 타입 정의
export interface GetUserRequest {
  item: UserItem;
}

// UserItem 타입 정의
export interface UserItem {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string; // optional
  phone?: string; // optional
  address?: string; // optional
  bio?: string; // optional
  shop?: {
    item: ShopItem;
  } | null;
}

// ShopItem 타입 정의
export interface ShopItem {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

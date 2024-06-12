export interface Authentication {
  item: AuthenticationItem;
  links: any[];
}

export interface AuthenticationItem {
  token: string;
  user: User;
}

export interface User {
  item: UserItem;
  href: string;
}

export interface UserItem {
  id: string;
  email: string;
  type: 'employee' | 'employer';
  name: string;
  phone: string;
  address: string;
  bio: string;
}

export type Token = string | null;
export type UserType = 'employee' | 'employer' | null;
export type UserId = string | null;

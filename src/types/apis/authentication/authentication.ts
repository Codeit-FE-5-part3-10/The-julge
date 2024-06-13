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

export type Token = string;
export type UserType = 'employee' | 'employer';
export type UserId = string;

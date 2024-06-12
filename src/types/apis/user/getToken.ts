export interface UserItem {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface GetTokenResponse {
  item: {
    token: string;
    user: {
      item: UserItem;
      href: string;
    };
  };
  links: any[];
}

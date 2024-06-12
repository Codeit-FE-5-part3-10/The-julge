import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface UserInfoType {
  address: string;
  bio: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  type: string;
}

export const UserAtom = atom<UserInfoType | null>({
  key: 'UserAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// recoil/atoms.ts
import { atom } from 'recoil';
import { UserInfoType } from '@/src/utils/TokenProvider';

export const userInfoState = atom<UserInfoType | null>({
  key: 'userInfoState',
  default: null,
});

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { GetUserItem } from '../types/apis/user/getUser';

const { persistAtom } = recoilPersist(); // Atom의 상태를 로컬 스토리지나 다른 영속적인 저장소에 지속시키기 위한 함수

export interface UserInfoType {
  address: string;
  bio: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  type: string;
}

export const UserAtom = atom<GetUserItem | null>({
  key: 'UserAtom', // 고유 식별자인 키를 설정.
  default: null, // Atom의 초기값을 설정합니다. 여기 userInfo가 들어갈거임
  effects_UNSTABLE: [persistAtom], // Atom에 적용할 비동기 효과(effects)를 설정.
  //여기서는 상태를 지속시키는 persistAtom이 적용됩니다.
});

export const TokenAtom = atom<string | null>({
  key: 'TokenAtom', // 고유 식별자인 키를 설정.
  default: null, // Atom의 초기값을 설정합니다. 여기 userInfo가 들어갈거임
  effects_UNSTABLE: [persistAtom], // Atom에 적용할 비동기 효과(effects)를 설정.
  //여기서는 상태를 지속시키는 persistAtom이 적용됩니다.
});

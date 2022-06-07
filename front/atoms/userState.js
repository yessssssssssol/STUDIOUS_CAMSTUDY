import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: { user: null },
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom({
  key: 'tokenState',
  default: { token: null },
  effects_UNSTABLE: [persistAtom],
});

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const aiAtom = atom({
  key: 'userIsHear',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

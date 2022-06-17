import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export const aiAtom = atom({
  key: 'userIsHear',
  default: true,
});

export const readyAtom = atom({
  key: 'getReady',
  default: false,
});

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const createroomAtom = atom({
  key: 'room',
  default: { room: null },
  effects_UNSTABLE: [persistAtom],
});

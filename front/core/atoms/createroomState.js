import { atom } from 'recoil';

export const createroomAtom = atom({
  key: 'room',
  default: { room: null },
});

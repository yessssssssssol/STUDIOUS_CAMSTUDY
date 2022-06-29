import { atom } from 'recoil';

export const createroomAtom = atom({
  key: 'room',
  default: { room: null },
});
export const editroomAtom = atom({
  key: 'editroom',
  default: { room: null },
});

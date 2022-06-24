import { atom } from 'recoil';

export const loginModalState = atom({
  key: 'loginModalState',
  default: false,
});

export const registerModalState = atom({
  key: 'registerModalState',
  default: false,
});

export const editUserModalAtom = atom({
  key: 'editUserModalState',
  default: false,
});

export const editProfileModalAtom = atom({
  key: 'editProfileModalState',
  default: false,
});

export const dropboxModalState = atom({
  key: 'dropboxModalState',
  default: false,
});
export const menuModalState = atom({
  key: 'menuModalState',
  default: false,
});

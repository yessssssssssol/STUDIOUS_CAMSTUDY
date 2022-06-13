import { atom } from 'recoil';

export const loginModalState = atom({
  key: 'loginModalState',
  default: false,
});

export const registerModalState = atom({
  key: 'registerModalState',
  default: false,
});

export const editProfileModalState = atom({
  key: 'profileModalState',
  default: false,
});

export const dropboxModalState = atom({
    key : 'dropboxModalState',
    default : false
})
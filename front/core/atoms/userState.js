import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userAtom = atom({
  key: 'user',
  default: { user: null },
  effects_UNSTABLE: [persistAtom],
});

export const tokenAtom = atom({
  key: 'token',
  default: { token: null },
  effects_UNSTABLE: [persistAtom],
});

export const isloginAtom = atom({
  key: 'islogin',
  default: { login: false },
  effects_UNSTABLE: [persistAtom],
});
// export const currentUserState = atom({
//   key: 'currentUserState',
//   default: { user: null },
//   effects_UNSTABLE: [persistAtom],
// });

export const profileUrlAtom = atom({
  key: 'profileUrl',
  default: { profileUrl: null },
  effects_UNSTABLE: [persistAtom],
});

export const userNameAtom = atom({
  key: 'userName',
  default: { userName: null },
  effects_UNSTABLE: [persistAtom],
});

export const userDescriptionAtom = atom({
  key: 'userDescription',
  default: { userDescription: null },
  effects_UNSTABLE: [persistAtom],
});

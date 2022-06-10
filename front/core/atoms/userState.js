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

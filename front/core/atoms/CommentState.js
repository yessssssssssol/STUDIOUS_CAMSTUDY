import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const createContentAtom = atom({
  key: 'content',
  default: { content: null },
  effects_UNSTABLE: [persistAtom],
});

export const editContentAtom = atom({
  key: 'editContent',
  default: { content: null },
  effects_UNSTABLE: [persistAtom],
});

export const writerIdAtom = atom({
  key: 'writerId',
  default: { content: null },
  effects_UNSTABLE: [persistAtom],
});

import { selector } from 'recoil';

export const isHereSelector = selector({
  key: 'isHear',
  get: async ({ get }) => {},
  set: ({ set }, newValue) => set(myAtom, newValue),
});

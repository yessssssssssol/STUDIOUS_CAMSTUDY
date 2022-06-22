import { useBeforeunload } from 'react-beforeunload';

export function useBeforeunloads() {
  useBeforeunload((e) => {
    e.preventDefault();
    window.localStorage.clear();
  });
}

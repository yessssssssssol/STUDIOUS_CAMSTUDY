import { useBeforeunload } from 'react-beforeunload';

export function useBeforeunloads() {
  useBeforeunload((e) => {
    e.preventDefault();
    useUserActions.logout().catch((err) => {
      console.log(err);
    });
    window.localStorage.clear();
  });
}

// useBeforeunload((e) => {
//   e.preventDefault();
//   useUserActions.logout().catch((err) => {
//     console.log(err);
//   });
// });

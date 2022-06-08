import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import * as Api from '../api';
import { tokenAtom, userAtom } from './userState';

export function useUserActions() {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenAtom);
  const setUser = useSetRecoilState(userAtom);
  // history 필요할 때
  const currentURL = router.asPath;

  return {
    login,
    logout,
  };
  async function login(email, password) {
    return await Api.post('user/login', {
      email,
      password,
    }).then((res) => {
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem('userToken', jwtToken);
      setUser(user);
      setToken(jwtToken);
      console.log('로그인 성공');

      // 일단 로그인 시 메인 페이지로 가게 해 놓음
      // 추후 변경 예정
      router.push('/');
    });
  }

  async function logout() {
    sessionStorage.removeItem('userToken');
    setToken(null);
    router.push('/');
  }
}

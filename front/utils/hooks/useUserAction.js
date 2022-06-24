import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import * as Api from '../../pages/api/api';
import {
  tokenAtom,
  userAtom,
  userNameAtom,
  userDescriptionAtom,
  profileUrlAtom,
  isloginAtom,
} from '../../core/atoms/userState';
import { createroomAtom } from '../../core/atoms/createroomState';

export function useUserActions() {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenAtom);
  const setUser = useSetRecoilState(userAtom);
  const setName = useSetRecoilState(userNameAtom);
  const setDescription = useSetRecoilState(userDescriptionAtom);
  const setProfileUrl = useSetRecoilState(profileUrlAtom);
  const setRoom = useResetRecoilState(createroomAtom);
  const setIsLogin = useSetRecoilState(isloginAtom);
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
      const { name, description, profileUrl } = user;
      const jwtToken = user.token;
      sessionStorage.setItem('userToken', jwtToken);
      setUser(user);
      setToken(jwtToken);
      setName(name);
      setDescription(description);
      setProfileUrl(profileUrl);
      setIsLogin(true);
      console.log('로그인 성공');

      // 일단 로그인 시 메인 페이지로 가게 해 놓음
      // 추후 변경 예정
      router.push('/');
    });
  }

  async function logout() {
    sessionStorage.removeItem('userToken');
    setToken(null);
    setUser(null);
    setRoom(null);
    setIsLogin(false);
    router.push('/');
  }
}

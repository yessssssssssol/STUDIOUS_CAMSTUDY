import Helmet from '../components/layout/Helmet';
import Prologue from '../pages/prologue/index';
import { isLoginAtom } from '../core/atoms/userState';
import { useRecoilState } from 'recoil';
import IsLoginHome from '../pages/home/index';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [loginState, setLoginState] = useState(null);

  useEffect(() => {
    setLoginState(true);
  }, []);

  if (isLogin && loginState) {
    return <IsLoginHome />;
  } else {
    return (
      <div>
        <Helmet title="HOME" />
        <Prologue />
      </div>
    );
  }
}

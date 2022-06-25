import Helmet from '../components/layout/Helmet';
import PrologueTop from '../components/prologue/PrologueTop';
import { isloginAtom } from '../core/atoms/userState';
import { useRecoilState } from 'recoil';
import IsLoginHome from '../pages/home/index';
import { useEffect, useState } from 'react';

export default function Home() {
  const [islogin, setIsLogin] = useRecoilState(isloginAtom);
  const [loginState, setLoginState] = useState(null);

  useEffect(() => {
    setLoginState(true);
  }, []);

  if (islogin && loginState) {
    return <IsLoginHome />;
  } else {
    return (
      <div>
        <Helmet title="HOME" />
        <PrologueTop />
      </div>
    );
  }
}

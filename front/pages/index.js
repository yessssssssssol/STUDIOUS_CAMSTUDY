import Helmet from '../components/layout/Helmet';
import PrologueTop from '../components/prologue/PrologueTop';
import { isloginAtom } from '../core/atoms/userState';
import { useRecoilState } from 'recoil';
import IsLoginHome from '../pages/home/index';
import { useEffect, useState } from 'react';

export default function Home() {
  const [islogin, setIsLogin] = useRecoilState(isloginAtom);
  const [element, setElement] = useState(null);

  useEffect(() => {
    setElement(true);
  }, []);

  if (islogin && element) {
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

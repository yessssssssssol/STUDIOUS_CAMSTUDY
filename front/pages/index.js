import Helmet from '../components/layout/Helmet';
import PrologueTop from '../components/prologue/PrologueTop';
import { isloginAtom } from '../core/atoms/userState';
import { useRecoilState } from 'recoil';
import IsLoginHome from '../pages/home/index';

export default function Home() {
  const [islogin, setIsLogin] = useRecoilState(isloginAtom);
  if (!islogin) {
    return (
      <div>
        <Helmet title="HOME" />
        <PrologueTop />
      </div>
    );
  } else {
    return <IsLoginHome />;
  }
}

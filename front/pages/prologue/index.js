import PrologueTop from '../../components/prologue/PrologueTop';
import PrologueMid1 from '../../components/prologue/PrologueMid1';
import PrologueMid2 from '../../components/prologue/PrologueMid2';
import PrologueMid3 from '../../components/prologue/PrologueMid3';
import PrologueBottom from '../../components/prologue/PrologueBottom';
import Helmet from '../../components/layout/Helmet';
import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

/** 서비스 소개 페이지 컴포넌트
 *
 * @component
 * @return Prologue
 */
const Prologue = () => {
  let boxStyle = {
    width: '40%',
    height: '200px',
    fontSize: '30px',
    lineHeight: '200px',
    background: 'black',
    color: 'white',
    textAlign: 'center',
  };
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);
  return (
    <div>
      <Helmet title="Introduction" />

      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <PrologueTop />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <PrologueMid1 />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <PrologueMid2 />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <PrologueMid3 />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <PrologueBottom />
      </div>
    </div>
  );
};

export default Prologue;

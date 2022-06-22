import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import { useBeforeunload } from 'react-beforeunload';
import { useUserActions } from '../utils/hooks/useUserAction';
// import dynamic from 'next/dynamic';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
function MyApp({ Component, pageProps }) {
  // useBeforeunload((e) => {
  //   e.preventDefault();
  //   useUserActions.logout().catch((err) => {
  //     console.log(err);
  //   });
  // });

  return (
    <RecoilRoot>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });

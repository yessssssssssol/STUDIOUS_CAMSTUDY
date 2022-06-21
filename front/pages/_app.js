import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import dynamic from 'next/dynamic';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

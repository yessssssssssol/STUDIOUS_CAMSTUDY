import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import { useBeforeunloads } from '../utils/hooks/useBeforeunload';
// import dynamic from 'next/dynamic';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

export default function MyApp({ Component, pageProps }) {
  // useBeforeunloads();
  return (
    <RecoilRoot>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}

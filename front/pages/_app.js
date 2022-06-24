import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}

import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import NavBar from '../components/layout/NavBar';
// import NavBar from '../components/NavBar';
import Footer from '../components/layout/Footer';
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <RecoilRoot>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </RecoilRoot>
    </div>
  );
}

export default MyApp;

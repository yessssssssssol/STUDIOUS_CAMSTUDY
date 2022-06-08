import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <RecoilRoot>
        <NavBar />
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
}

export default MyApp;

import '../styles/globals.css';

import Button from '../components/Button';
import NavBarIcon from '../components/NavBar';
function MyApp({ Component, pageProps }) {
 
  return   ( 
  <div>
    <NavBarIcon/>
    <Component {...pageProps} />
    <Button Text={"스터디 시작하기"}/>
  </div>
  )

}

export default MyApp;

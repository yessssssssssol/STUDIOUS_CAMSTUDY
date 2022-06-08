import '../styles/globals.css';
import NavBarIcon from '../components/NavBarIcon';

import Button from '../components/Button';
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

import '../styles/globals.css';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
function MyApp({ Component, pageProps }) {
 
  return   ( 
  <div>

    <NavBar/>
    <Component {...pageProps} />
    <Button Text={"스터디 시작하기"}/>
  </div>
  )

}

export default MyApp;

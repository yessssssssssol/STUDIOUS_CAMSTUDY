import Helmet from '../components/layout/Helmet';
import NavBar from '../components/layout/NavBar';

export default function Home() {
  return (
    <div>
      <Helmet title='HOME' />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </div>
  );
}

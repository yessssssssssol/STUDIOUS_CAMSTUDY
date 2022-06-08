import Helmet from '../components/Helmet';

export default function Home() {
  return (
    <div>
      <Helmet title='HOME' />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </div>
  );
}

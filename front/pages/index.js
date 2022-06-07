import Halmet from '../components/Halmet';
import ProfileCard from '../components/ProfileCard';

export default function Home() {
  return (
    <div>
      <Halmet title='HOME' />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <ProfileCard />
    </div>
  );
}

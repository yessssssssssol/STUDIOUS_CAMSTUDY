import HomeMyLogTime from '../../components/home/HomeMyLogTime';
import HomeMyStudy from '../../components/home/HomeMyStudy';
import HomeOpenStudy from '../../components/home/HomeOpenStudy';
import HomeBoardStudy from '../../components/home/HomeBoardStudy';

const Home = () => {
  return (
    <div>
      Home page
      <HomeMyLogTime />
      <HomeMyStudy />
      <HomeOpenStudy />
      <HomeBoardStudy />
    </div>
  );
};

export default Home;

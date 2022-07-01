import HomeMyLogTime from '../../components/home/HomeMyLogTime';
import HomeMyStudy from '../../components/home/HomeMyStudy';
import HomeOpenStudy from '../../components/home/HomeOpenStudy';
import HomeBoardStudy from '../../components/home/HomeBoardStudy';
import HomeRanking from '../../components/home/HomeRanking';

const Home = () => {
  return (
    <div className="container mx-auto">
      <HomeMyLogTime />
      <HomeMyStudy />
      <HomeRanking />
      <HomeOpenStudy />
      <HomeBoardStudy />
    </div>
  );
};

export default Home;

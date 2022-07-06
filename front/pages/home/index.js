import HomeMyLogTime from '../../components/home/HomeMyLogTime';
import HomeMyStudy from '../../components/home/HomeMyStudy';
import HomeOpenStudy from '../../components/home/HomeOpenStudy';
import HomePrivateStudy from '../../components/home/HomePrivateStudy';
import HomeRanking from '../../components/home/HomeRanking';
import Helmet from '../../components/layout/Helmet';

const Home = () => {
  return (
    <div className="container mx-auto">
      <Helmet title="HOME" />
      <HomeMyLogTime />
      <HomeMyStudy />
      <HomeRanking />
      <HomeOpenStudy />
      <HomePrivateStudy />
    </div>
  );
};

export default Home;

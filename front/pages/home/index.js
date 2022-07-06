import HomeMyLogTime from '../../components/home/HomeMyLogTime';
import HomeMyStudy from '../../components/home/HomeMyStudy';
import HomePublicStudy from '../../components/home/HomePublicStudy';
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
      <HomePublicStudy />
      <HomePrivateStudy />
    </div>
  );
};

export default Home;

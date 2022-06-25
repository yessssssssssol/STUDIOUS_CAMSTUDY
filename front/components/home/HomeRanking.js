import { useEffect, useState } from 'react';
import * as API from '../../pages/api/api';
import RankingTable from '../../components/common/RankingTable';

const HomeRanking = () => {
  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    async function getRanking() {
      try {
        const res = await API.get('totaltimes');
        setRankings(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getRanking();
  }, []);

  return (
    <>
      {/* <div className="container"> */}
      <div>Ranking Top 10</div>
      <div className="flex items-center justify-center w-full">
        <RankingTable rankings={rankings} />
      </div>
      {/* </div> */}
    </>
  );
};

export default HomeRanking;

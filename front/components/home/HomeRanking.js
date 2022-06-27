import { useEffect, useState } from 'react';
import * as API from '../../pages/api/api';
import RankingTable from '../../components/common/RankingTable';

const HomeRanking = () => {
  const [rankings, setRankings] = useState([]);
  const [userDatas, setUserDatas] = useState([]);

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

  useEffect(() => {
    async function getUserId() {
      try {
        const res = await API.get(`userlist`);
        setUserDatas(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserId();
  }, []);

  return (
    <>
      {/* <div className="container"> */}
      <div class="mb-20">
        <div class="px-10 md:px-15 lg:px-20 font-bold text-2xl text-gray-800">
          Ranking Top 10
          <div class="border-none bg-indigo-500 w-20 h-1 mt-2 rounded text-xm"></div>
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <RankingTable
            rankings={rankings}
            setRankings={setRankings}
            userDatas={userDatas}
            setUserDatas={setUserDatas}
          />
        </div>
      </div>
    </>
  );
};

export default HomeRanking;

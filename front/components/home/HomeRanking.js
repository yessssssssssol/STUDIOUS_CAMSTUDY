import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import * as API from '../../pages/api/api';
import RankingTable from '../../components/common/RankingTable';
// import RankingTable2 from '../common/RankingTable2';

const NoSSR = dynamic(() => import('../common/RankingTable2'), {
  ssr: false,
});

const HomeRanking = () => {
  const [rankings, setRankings] = useState([]);
  const [userDatas, setUserDatas] = useState([]);

  useEffect(() => {
    async function getRanking() {
      try {
        const res = await API.get('totaltimes/ranking');
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

  // const timeSort = rankings.sort((a, b) => a.totalTime - b.totalTime);
  // const timeSort = rankings.sort((a, b) =>
  //   a.totalTime.toLowerCase() < b.totalTime.toLowerCase() ? 1 : -1
  // );
  // console.log('timeSort');
  // console.log(timeSort);
  // console.log(timeSort === rankings);

  return (
    <>
      {/* <div className="container"> */}
      <div className="mb-20">
        <div className="px-10 md:px-15 lg:px-20 font-bold text-2xl text-gray-800">
          Ranking Top 10
          <div className="border-none bg-amber-400 w-20 h-1 mt-2 rounded text-xm"></div>
        </div>
        {/* <div className="flex items-center justify-center w-full mt-8">
          <RankingTable
            rankings={rankings}
            setRankings={setRankings}
            userDatas={userDatas}
            setUserDatas={setUserDatas}
          />
        </div> */}
        <div className="flex items-center justify-center w-full mt-8">
          <NoSSR rankings={rankings} userDatas={userDatas} />
        </div>
      </div>
    </>
  );
};

export default HomeRanking;

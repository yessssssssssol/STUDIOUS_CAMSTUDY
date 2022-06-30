import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as API from '../../pages/api/api';
import BoardCard from '../../components/common/BoardCard';

const HomeBoardStudy = ({ profileURL }) => {
  const [boardDatas, setBoardData] = useState();

  useEffect(() => {
    async function getBoardData() {
      try {
        const res = await API.get('memberonly/studyrooms');
        setBoardData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getBoardData();
  }, []);

  return (
    <div className="mb-20 flex-col">
      <div>
        <div className="px-10 md:px-15 lg:px-20 font-bold text-2xl text-gray-800">
          Private STUDY
          <div className="border-none bg-amber-400 w-20 h-1 mt-2 rounded text-xm"></div>
        </div>
        <div>
          <div className="flex flex-raw h-full w-full flex-wrap lg:flex justify-center">
            {boardDatas &&
              boardDatas.slice(0, 3).map((boardData, index) => {
                return (
                  <BoardCard
                    key={index}
                    boardData={boardData}
                    profileURL={profileURL}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Link href={'/board'}>
          <button className="bg-amber-400 text-white font-bold rounded-full px-10 py-3">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBoardStudy;

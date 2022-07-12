import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as API from '../../pages/api/api';
import PrivateCard from '../../components/common/PrivateCard';

const HomeBoardStudy = ({ profileURL }) => {
  const [boardDatas, setBoardData] = useState();

  /**
   * @description Private Study Rooms List
   */
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
    <div className="mb-20 ">
      <div>
        <div className="px-10 md:px-15 lg:px-20 font-bold text-2xl text-gray-800">
          Private STUDY
          <div className="border-none bg-amber-400 w-20 h-1 mt-2 rounded text-xm"></div>
        </div>
      </div>
      <div className="px-10 md:px-15 lg:px-20">
        <div className="h-full w-full flex flex-raw flex-wrap lg:flex justify-center p-1">
          {boardDatas &&
            boardDatas.slice(0, 3).map((boardData, index) => {
              return (
                <PrivateCard
                  key={index}
                  boardData={boardData}
                  profileURL={profileURL}
                />
              );
            })}
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Link href={'/privatestudy'}>
          <button className="px-4 py-1 bg-amber-400 text-white rounded font-semibold shadow-lg hover:bg-amber-500 hover:scale-110 hover:shadow-amber-300/50 mx-5">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeBoardStudy;

import BoardCard from '../../components/common/BoardCard';
import Helmet from '../../components/layout/Helmet';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import * as API from '../api/api';
import BoldText from '../../components/common/BoldText';
import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle';

export default function board({ profileURL }) {
  const [boardDatas, setBoardData] = useState();
  const [count, setCount] = useState(10);
  const [ref, inView] = useInView();

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
  useEffect(() => {
    if (inView) {
      setCount((v) => {
        v <= boardDatas.length ? setCount(v + 10) : setCount(v);
      });
    }
  }, [inView]);
  return (
    <>
      <div className="px-10 md:px-15 lg:px-[60px] font-bold text-2xl text-gray-800">
        <span className="flex">
          Private Study
          <span className="pt-1 ml-3">
            <a href={'../studyroom/create'}>
              <AiFillPlusCircle fill="#fbbf24" />
            </a>
          </span>
          <span className="pt-1 text-sm ml-[20px] text-gray-300">
            목표가 비슷한 사람을 찾아서 스터디 해보세요!{' '}
          </span>
        </span>

        <div className="border-none bg-amber-400 w-20 h-1 mt-2 rounded text-xm"></div>
      </div>

      <div className="container flex flex-raw flex-wrap lg:flex justify-center">
        <Helmet title="board" />
        {boardDatas &&
          boardDatas.slice(0, count).map((boardData, index) => {
            return (
              <div key={index}>
                <BoardCard boardData={boardData} profileURL={profileURL} />
                <div ref={ref} />
              </div>
            );
          })}
      </div>
    </>
  );
}

import BoardCard from '../../components/common/BoardCard';
import Helmet from '../../components/layout/Helmet';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import * as API from '../api/api';
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
    <div className="flex flex-raw flex-wrap lg:flex justify-center">
      <Helmet title="board" />
      {boardDatas &&
        boardDatas.slice(0, count).map((boardData, index) => {
          return (
            <>
              <BoardCard
                key={index}
                boardData={boardData}
                profileURL={profileURL}
              />
              <div ref={ref} />
            </>
          );
        })}
    </div>
  );
}

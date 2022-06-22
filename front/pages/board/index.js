import BoardCard from '../../components/common/BoardCard';
import Helmet from '../../components/layout/Helmet';
import { userAtom } from '../../core/atoms/userState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { ApiError } from 'next/dist/server/api-utils';
import * as API from '../api/api';
export default function board({ profileURL }) {
  const [boardDatas, setBoardData] = useState();

  useEffect(() => {
    async function getBoardData() {
      try {
        const res = await API.get('memberonly/studyrooms');
        console.log(res);
        setBoardData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getBoardData();
  }, []);
  return (
    <div class="flex flex-raw flex-wrap lg:flex justify-center">
      <Helmet title="board" />
      {boardDatas &&
        boardDatas.map((boardData) => {
          console.log(boardData);
          return <BoardCard boardData={boardData} profileURL={profileURL} />;
        })}
    </div>
  );
}

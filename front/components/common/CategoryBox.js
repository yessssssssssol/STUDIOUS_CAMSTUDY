import { RiEdit2Fill } from '@react-icons/all-files/Ri/RiEdit2Fill';
import Link from 'next/link';
import DeleteModal from './DeleteModal';

import { BsTrashFill } from '@react-icons/all-files/Bs/BsTrashFill';
import { useEffect, useState } from 'react';
import { userAtom } from '../../core/atoms/userState';
import { useRecoilValue } from 'recoil';

export default function CategoryBox({ myroomInfo, color }) {
  const useratom = useRecoilValue(userAtom);
  const [open, setOpen] = useState(false);
  const onClickHander = () => {
    setOpen(true);
  };

  const openRoom = `openroom/board/${myroomInfo.roomId}`;
  const privateRoom = `/board/detail/${myroomInfo.roomId}`;

  //myroomInfo.group === false 이면
  // 링크 연결 바로 공부방으로
  //myroomInfo.membersOnly

  return (
    <div
      className={`flex justify-between bg-amber-300  hover:bg-amber-400 shadow-amber-400/50 shadow-lg hover:shadow-2xl rounded-xl h-[100px] my-[50px]`}
    >
      <Link href={myroomInfo.membersOnly ? privateRoom : openRoom}>
        <a className="flex items-center ml-[30px] text-xl font-bold cursor-pointer">
          <section className="">{myroomInfo.roomName}</section>
        </a>
      </Link>
      {myroomInfo?.id === useratom?.id ? (
        <section className="flex items-center mr-[30px] font-bold">
          <Link href={`/board/edit/${myroomInfo.roomId}`}>
            <a className="cursor-pointer mr-[15px]">
              <RiEdit2Fill size="25" />
            </a>
          </Link>
          <button onClick={onClickHander}>
            <BsTrashFill size="25" />
          </button>
          {open && (
            <DeleteModal
              myroomInfo={myroomInfo}
              setShow={setOpen}
              title={'게시글을 지우시겠습니까?'}
            />
          )}
        </section>
      ) : null}
    </div>
  );
}

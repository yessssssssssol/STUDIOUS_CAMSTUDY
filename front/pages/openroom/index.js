import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import OpenroomCard from '../../components/common/OpenroomCard';
import Helmet from '../../components/layout/Helmet';
import { userAtom } from '../../core/atoms/userState';
import * as API from '../api/api';
import { useInView } from 'react-intersection-observer';
import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle';
export default function Openroom() {
  const [count, setCount] = useState(10);
  const [openRooms, setOpenRooms] = useState([]);
  const [openRoomCount, setOpenRoomCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    async function getOpenroom() {
      const res = await API.get('open/studyrooms');
      const data = res.data;
      setOpenRooms(data);
      setOpenRoomCount(data.length);
    }
    getOpenroom();
  }, [openRoomCount]);

  useEffect(() => {
    if (inView) {
      setCount((v) => {
        v <= openRoomCount ? setCount(v + 10) : setCount(v);
      });
    }
  }, [inView]);
  return (
    <div>
      <div className="px-10 md:px-15 lg:px-[60px] font-bold text-2xl text-gray-800">
        <span className="flex">
          Open Study
          <span className="pt-1 ml-3">
            <a href={'../studyroom/create'}>
              <AiFillPlusCircle fill="#fbbf24" />
            </a>
          </span>
          <span className="pt-1 text-sm ml-[20px] text-gray-300">
            언제든 모두와 참여할 수 있는 스터디방을 만들어보세요!
          </span>
        </span>
        <div className="border-none bg-amber-400 w-20 h-1 mt-2 rounded text-xm"></div>
      </div>
      <div className="h-full w-full flex flex-raw flex-wrap lg:flex justify-center gap-x-[3rem]">
        <Helmet title="Openroom" />
        {openRooms &&
          openRooms.slice(0, count).map((openRoom, index) => {
            return (
              <div key={index}>
                <OpenroomCard key={index} openRoom={openRoom} />
                <div ref={ref} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

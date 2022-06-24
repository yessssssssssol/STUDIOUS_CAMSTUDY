import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import OpenroomCard from '../../components/common/OpenroomCard';
import Helmet from '../../components/layout/Helmet';
import { userAtom } from '../../core/atoms/userState';
import * as API from '../api/api';
import { useInView } from 'react-intersection-observer';

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
    <div className="flex flex-raw flex-wrap lg:flex justify-center gap-x-[100px]">
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
  );
}

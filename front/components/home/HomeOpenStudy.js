import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as API from '../../pages/api/api';
import OpenroomCard from '../../components/common/OpenroomCard';

const HomeOpenStudy = () => {
  const [openRooms, setOpenRooms] = useState([]);
  useEffect(() => {
    async function getOpenroom() {
      const res = await API.get('open/studyrooms');
      const data = res.data;
      // console.log(data, 'openrooms');
      setOpenRooms(data);
    }
    getOpenroom();
  }, []);
  return (
    <div className="mb-20">
      <div className="px-10 md:px-15 lg:px-20 font-bold text-2xl text-gray-800">
        오픈 스터디방 입장
        <div className="border-none bg-indigo-500 w-20 h-1 mt-2 rounded text-xm"></div>
      </div>
      <div className="px-10 md:px-15 lg:px-20">
        <div className="h-full w-full flex flex-raw flex-wrap">
          {openRooms &&
            openRooms.slice(0, 4).map((openRoom, index) => {
              return <OpenroomCard openRoom={openRoom} key={index} />;
            })}
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Link href={'/openroom'}>
          <button className="bg-gray-700 text-white font-bold rounded-full px-10 py-3">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeOpenStudy;

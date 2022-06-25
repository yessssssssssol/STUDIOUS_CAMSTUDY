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
      console.log(data, 'openrooms');
      setOpenRooms(data);
    }
    getOpenroom();
  }, []);
  return (
    <>
      <div>오픈 스터디방 입장</div>
      {/* <div class="px-10 md:px-15 lg:px-20"> */}
      <div class="h-full w-full flex flex-raw flex-wrap">
        {openRooms &&
          openRooms.slice(0, 4).map((openRoom) => {
            return (
              <div className="lg:w-1/4">
                <OpenroomCard openRoom={openRoom} />
              </div>
            );
          })}
      </div>
      {/* </div> */}
      <div>
        <Link href={'/openroom'}>
          <button className="w-full items-center ">View All</button>
        </Link>
      </div>
    </>
  );
};

export default HomeOpenStudy;

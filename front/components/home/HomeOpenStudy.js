import { useEffect, useState } from 'react';
import OpenroomCard from '../../components/common/OpenroomCard';
import Helmet from '../../components/layout/Helmet';
import * as API from '../../pages/api/api';
import Link from 'next/link';

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
      <div class="flex flex-raw flex-wrap lg:flex justify-center gap-x-[100px]">
        <Helmet title="Openroom" />

        {openRooms &&
          openRooms.slice(0, 4).map((openRoom) => {
            return (
              <div className="">
                <OpenroomCard openRoom={openRoom} />
              </div>
            );
          })}
      </div>
      <div>
        <Link href={'/openroom'}>
          <button className="w-full items-center ">View All</button>
        </Link>
      </div>
    </>
  );
};

export default HomeOpenStudy;

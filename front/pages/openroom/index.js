import { useEffect, useState } from 'react';
import OpenroomCard from '../../components/common/OpenroomCard';
import Helmet from '../../components/layout/Helmet';
import * as API from '../api/api';
export default function Openroom() {
  const [openRooms, setOpenRooms] = useState([]);
  useEffect(() => {
    async function getOpenroom() {
      const res = await API.get('open/studyrooms');
      setOpenRooms(res.data);
      console.log(openRooms);
    }
    getOpenroom();
  }, []);
  return (
    <div class="flex flex-raw flex-wrap lg:flex-auto justify-start gap-x-[100px] ">
      <Helmet title="Openroom" />

      {openRooms.map((openRoom) => {
        <OpenroomCard openRoom={openRoom} />;
      })}
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
      <OpenroomCard />
    </div>
  );
}

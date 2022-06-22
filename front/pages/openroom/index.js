import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import OpenroomCard from '../../components/common/OpenroomCard';
import Helmet from '../../components/layout/Helmet';
import { userAtom } from '../../core/atoms/userState';
import * as API from '../api/api';
export default function Openroom() {
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
    <div class="flex flex-raw flex-wrap lg:flex justify-center gap-x-[100px]">
      <Helmet title="Openroom" />

      {openRooms &&
        openRooms.map((openRoom) => {
          return (
            <div className="">
              <OpenroomCard openRoom={openRoom} />
            </div>
          );
        })}
    </div>
  );
}

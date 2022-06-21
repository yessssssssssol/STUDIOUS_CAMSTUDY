import { local } from 'd3';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import OpenroomCard from '../../components/common/OpenroomCard';
import Helmet from '../../components/layout/Helmet';
import { userAtom } from '../../core/atoms/userState';
import * as API from '../api/api';
export default function Openroom({ data }) {
  const [openRooms, setOpenRooms] = useState([]);
  const user = useRecoilValue(userAtom);
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
    <div class="flex flex-raw flex-wrap lg:flex-auto justify-start gap-x-[100px] ">
      <Helmet title="Openroom" />

      {openRooms &&
        openRooms.map((openRoom) => {
          return (
            <>
              <OpenroomCard openRoom={openRoom} />
            </>
          );
        })}
    </div>
  );
}
export async function getServerSideProps(context) {
  // 서버로 API 요청
  console.log(context.req.headers);
  //
  //   // Page 컴포넌트로 data 전달
  return { props: {} };
}

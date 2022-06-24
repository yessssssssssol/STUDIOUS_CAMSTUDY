import { useEffect, useState } from 'react';
import MyStudyRoomCard from '../../components/common/MyStudyRoomCard';
import Helmet from '../../components/layout/Helmet';
import * as API from '../../pages/api/api';
import { userAtom } from '../../core/atoms/userState';
import { useRecoilValue } from 'recoil';
import Link from 'next/link';

const HomeMyStudy = () => {
  const [myStudyRooms, setMyStudyRooms] = useState([]);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    async function getMyStudyRooms() {
      const res = await API.get(`studyrooms/${user?.id}`);
      const data = res.data;
      setMyStudyRooms(data);
    }
    getMyStudyRooms();
  }, []);

  return (
    <>
      <div>내 스터디방 입장</div>

      <div class="px-10">
        {/* <Helmet title="MyStudyRoom" /> */}
        <div class="h-full w-full flex flex-raw overflow-auto white-space-nowrap">
          {myStudyRooms &&
            myStudyRooms.map((myStudyRoom) => {
              return (
                <div className="myStudyRoom">
                  <MyStudyRoomCard myStudyRoom={myStudyRoom} />
                </div>
              );
            })}
          {/* 스터디룸 만들기  */}
          {/* <div className=" px-2 py-10 mx-auto sm:max-w-xl  md:px-12 lg:px-20"> */}
          <div className=" px-2 py-10 sm:max-w-xl md:px-12 lg:px-20">
            <div className="grid gap-5 sm:max-w-sm sm:mx-auto">
              <a href={'/studyroom/create'} aria-label="Article">
                <div className="flex items-center justify-center bg-gray-300 h-[300px] w-[250px] rounded-xl  ">
                  <p className="font-bold text-300">+ 방 추가</p>
                </div>
              </a>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default HomeMyStudy;

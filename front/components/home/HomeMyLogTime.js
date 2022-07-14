import * as API from '../../pages/api/api';
import { userAtom } from '../../core/atoms/userState';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * @component
 * @description 나의 누적 공부시간과 프로필
 */
const HomeMyLogTime = () => {
  const useratom = useRecoilValue(userAtom);
  const [timeDatas, setTimeData] = useState(null);
  const [user, setUser] = useState();

  /**
   * @description 유저의 전체 누적 공부시간을 불러옴
   */
  useEffect(() => {
    setUser(useratom);
    const getTotalTime = async () => {
      try {
        const res = await API.get('totaltime', useratom.id);
        const data = res.data;
        setTimeData(data.totalStudyTime);
      } catch (err) {
        setTimeData('00:00:00');
      }
    };
    getTotalTime();
  }, [user]);

  return (
    <div className="container px-6 py-16 mx-auto">
      <div className="items-center lg:flex">
        {/* 누적 공부시간 */}
        <div className="w-full text-center lg:w-2/3">
          <div className="font-bold text-4xl text-gray-500 text-center mb-5">
            {`${user?.name}님의 누적 공부시간`}
          </div>
          <div className="font-black text-3xl text-gray-700 text-center">{`${timeDatas}`}</div>
        </div>
        {/* 나의 프로필 */}
        <div className="flex items-center justify-center w-full mt-2 lg:mt-0 lg:w-1/3 drop-shadow-md hover:scale-105">
          <div className="lg:max-w-lg">
            <Link href={'/mypage'}>
              <button className="myBtn flex items-center bg-white p-4 rounded-lg drop-shadow-md">
                <img
                  className="w-20 h-20 object-fill rounded-full"
                  src={user?.profileUrl}
                  alt="user photo"
                />
                <div className="flex-col">
                  <p className="ml-6 text-left text-amber-400 font-bold">
                    {user?.name}
                  </p>
                  <p className="ml-6 text-left text-gray-600 font-semibold">
                    {user?.description}
                  </p>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMyLogTime;

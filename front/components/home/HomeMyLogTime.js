import Mypage from '../../pages/mypage';
import * as API from '../../pages/api/api';
import { userAtom } from '../../core/atoms/userState';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomeMyLogTime = () => {
  const useratom = useRecoilValue(userAtom);
  const [timeDatas, setTimeData] = useState(null);
  const [user, setUser] = useState();

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
          <div className="font-bold text-3xl text-center">
            {`${user?.name}님의 누적 공부시간`}
          </div>
          <div className="font-bold text-3xl text-center">{`${timeDatas}`}</div>
        </div>
        {/* 나의 프로필 */}
        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/3">
          <div className="lg:max-w-lg">
            <Link href={'/mypage'}>
              <button className="myBtn flex items-center ">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.profileUrl}
                  alt="user photo"
                />
                <p className="ml-6 text-left text-gray-600 dark:text-gray-400">
                  {user?.name} <br /> {user?.description}
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMyLogTime;

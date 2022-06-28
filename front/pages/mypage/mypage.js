import BoldText from '../../components/common/BoldText';
import TimeBox from '../../components/common/TimeBox';
import dynamic from 'next/dynamic';
import Pie from '../../components/common/Pie';
import Button from '../../components/common/Button';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import { useRouter } from 'next/router';

import * as API from '../api/api';
import { charts_data, charts_color } from '../../components/common/UseData';

export default function my() {
  const useratom = useRecoilValue(userAtom);

  const [timeDatas, setTimeData] = useState(null);
  const [user, setUser] = useState();
  const [gittime, setGitTime] = useState([]);
  const [timeGoal, setTimeGoal] = useState();
  const [getTimeGoal, setGetTimeGoal] = useState();
  const [pieData, setPieData] = useState([]);

  const router = useRouter();

  const NoSSR = dynamic(() => import('../../components/common/Heatmap'), {
    ssr: false,
  });

  function toMilliseconds(studyTimeADay) {
    const studyTimeADayNum =
      Number(studyTimeADay.slice(0, 2)) * 60 * 60 * 1000 +
      Number(studyTimeADay.slice(3, 5)) * 60 * 1000 +
      Number(studyTimeADay.slice(6)) * 1000;

    return studyTimeADayNum / 1000;
  }

  useEffect(() => {
    async function getTime() {
      console.log(router.query.id);
      try {
        const res = await API.get('user', router.query.id);
        console.log(res, '유저정보');
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    const getTimeData = async () => {
      try {
        const res = await API.get('totaltime', router.query.id);
        const data = res.data;
        var data2 = [
          data.studyTimeADay,
          data.weekStudyTime,
          data.totalStudyTime,
        ];
        setPieData([
          data.attendanceRate,
          data.weekAchievementRate,
          data.totalAchievementRate,
        ]);
        setTimeData(data2);
      } catch (err) {
        setTimeData(['00:00:00', '00:00:00', '00:00:00']);
      }
    };
    const getGitTimeData = async () => {
      const res = await API.get('dailysheets', router.query.id);
      const datas = res.data;
      console.log(datas);
      setGetTimeGoal(datas[datas.length - 1].timeGoal);
      datas.length == 0
        ? console.log('Git데이터', gittime)
        : datas.map((data) =>
            gittime.push([data.date, toMilliseconds(data.studyTimeADay)])
          );
    };

    if (router.isReady) {
      getTime();
      getTimeData();
      getGitTimeData();
      setGitTime(gittime);
    }
  }, [router.isReady]);

  async function clickHandler(e) {
    var res = '';
    {
      if (e.type === 'click') {
        if (Number(timeGoal) < '10') {
          res = await API.put('dailysheet', {
            timeGoal: '0' + timeGoal + ':00:00',
          });
        } else if (Number(timeGoal) > '24') {
          alert('목표공부시간 최대는 24시간 입니다.');
        } else {
          res = await API.put('dailysheet', {
            timeGoal: timeGoal + ':00:00',
          });
        }
      }
    }
    setGetTimeGoal(res.data.timeGoal);
  }
  return (
    <div>
      <section class="bg-white ">
        <div class="container px-6 py-10 mx-auto">
          <h1 class="text-3xl  text-gray-800 capitalize ">000님의 공부 기록</h1>
          <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div class="flex-col  p-8 space-y-3 border-2 border-amber-400 shadow-lg rounded-xl">
              <h1 class="text-xl font-semibold text-gray-400 capitalize ">
                오늘 공부 시간
              </h1>
              <p class="text-gray-500 text-4xl font-medium">00:00:00</p>
            </div>

            <div class="flex-col p-8 space-y-3 border-2 border-amber-400 shadow-lg rounded-xl">
              <h1 class="text-xl font-semibold text-gray-400 capitalize ">
                이번주 공부 시간
              </h1>

              <p class="text-gray-500 text-4xl font-medium ">00:00:00</p>
            </div>
            <div class="flex-col p-8 space-y-3 border-2 border-amber-400 shadow-lg rounded-xl">
              <h1 class="text-xl font-semibold text-gray-400 capitalize ">
                총 공부 시간
              </h1>

              <p class="text-gray-500 text-4xl font-medium">00:00:00</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
          {timeDatas?.map((time, index) => (
            <TimeBox
              key={index}
              index={index}
              timeData={time}
              timeGoal={getTimeGoal}
            />
          ))}
        </div>
        <div className="bg-gray-100">
          <div className="pt-[10px]">
            <NoSSR gittimes={gittime} />
          </div>
          <div className="bg-gray-100">
            <div className="flex flex-col items-center  lg:flex-row justify-evenly">
              {charts_data.map((title, index) => (
                <div key={index} className="py-8 lg:mr-[30px]">
                  <Pie
                    key={index}
                    title={title}
                    index={index}
                    pieData={pieData}
                    color={charts_color[Math.ceil(Math.random() * 10) + 1]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

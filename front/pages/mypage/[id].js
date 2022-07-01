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
import { charts_data, heatmap_tip } from '../../components/common/UseData';
export default function mypage() {
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
    const getTimeData = async () => {
      try {
        try {
          const res = await API.get('user', router.query.id);
          console.log(res, '유저정보');
          setUser(res.data);
        } catch (error) {
          console.log(error);
        }

        const totaltime = await API.get('totaltime', router.query.id);
        const data = totaltime.data;
        var data2 = [
          data.studyTimeADay,
          data.weekStudyTime,
          data.totalStudyTime,
        ];
        setTimeData(data2);

        const dailysheets = await API.get('dailysheets', router.query.id);
        const datas = dailysheets.data;
        setGetTimeGoal(datas[datas.length - 1].timeGoal);
        if (datas[datas.length - 1].bestStudyTime == ' ') {
          setPieData([
            data.attendanceRate,
            datas[datas.length - 1].achievementRate,
            '00:00:00',
          ]);
        } else {
          setPieData([
            data.attendanceRate,
            datas[datas.length - 1].achievementRate,
            datas[datas.length - 1].bestStudyTime,
          ]);
        }

        datas.length == 0
          ? null
          : datas.map((data) =>
              gittime.push([
                data.date,
                Math.floor(toMilliseconds(data.studyTimeADay) / 7200),
              ])
            );
      } catch (err) {
        setTimeData(['00:00:00', '00:00:00', '00:00:00']);
        setPieData([0, 0, 0]);
      }
    };
    if (router.isReady) {
      getTimeData();
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
    <div className="container">
      {user && (
        <div className="flex-col py-[50px] lg:px-[200px]">
          <div className="flex flex-row justify-between">
            <div className="font-bold text-3xl text-center lg:text-left my-[20px]">
              <BoldText text={`${user.name}님의 최근 공부 기록`} />
            </div>

            {useratom.id === router.query.id ? (
              <span className="hidden sm:block">
                <span className="bg-sky-500 text-white font-bold py-1 px-3 mx-2 rounded-full">
                  일일 목표
                </span>
                <input
                  className="text-center w-[70px] border-2 rounded-xl border-orange-300"
                  value={timeGoal}
                  onChange={(e) => setTimeGoal(e.target.value)}
                ></input>
                <span className=" mr-3">시간</span>
                <Button text={'설정'} onClick={clickHandler}></Button>
              </span>
            ) : null}
          </div>

          <div className="flex flex-col items-center lg:flex-row justify-evenly">
            {timeDatas?.map((time, index) => (
              <TimeBox
                key={index}
                index={index}
                timeData={time}
                timeGoal={getTimeGoal}
              />
            ))}
          </div>

          <div className="pt-[50px] ">
            <BoldText text={`1년 공부 기록`} />
            <div className="pt-[10px] shadow-xl my-[30px]">
              <NoSSR gittimes={gittime} />
              <div className="flex justify-center items-center h-[40px]">
                {heatmap_tip.map((tip, index) => {
                  return (
                    <p key={index} className="mr-3">
                      <span
                        className={`inline-block ${tip[0]} mt-2 bg-amber-100 h-4 w-4`}
                      ></span>
                      <span className="inline-block ml-1 text-xs text-gray-600">
                        {tip[1]}
                      </span>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          <div className=" pt-[50px]">
            <BoldText text={`공부 기록 통계`} />
            <div className="flex flex-col items-center  lg:flex-row justify-evenly">
              {pieData.map((data, index) => (
                <div key={index} className="py-8 lg:mr-[30px]">
                  {index === 2 ? (
                    <Pie
                      key={index}
                      title={charts_data[index]}
                      index={index}
                      pieData={data}
                    />
                  ) : (
                    <Pie
                      key={index}
                      title={charts_data[index]}
                      index={index}
                      pieData={data}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

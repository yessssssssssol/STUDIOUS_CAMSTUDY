import BoldText from '../components/common/BoldText';
import TimeBox from '../components/common/TimeBox';
import CategoryBox from '../components/common/CategoryBox';
import dynamic from 'next/dynamic';
import Pie from '../components/common/Pie';
import Button from '../components/common/Button';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../core/atoms/userState';
import * as API from '../pages/api/api';
import {
  charts_data,
  charts_color,
  category_time,
  randomColor,
} from '../components/common/UseData';
export default function mypage() {
  const [timeDatas, setTimeData] = useState(null);
  const useratom = useRecoilValue(userAtom);
  const [user, setUser] = useState();
  const [gittime, setGitTime] = useState([]);
  const [timeGoal, setTimeGoal] = useState();
  const [getTimeGoal, setGetTimeGoal] = useState();
  const [pieData, setPieData] = useState([]);
  const [myroomInfos, setMyroomInfos] = useState([]);
  const NoSSR = dynamic(() => import('../components/common/Heatmap'), {
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
    setUser(useratom);
    const getTimeData = async () => {
      try {
        const res = await API.get('totaltime', useratom.id);
        const data = res.data;
        var data2 = [
          data.studyTimeADay,
          data.weekStudyTime,
          data.totalStudyTime,
        ];
        setTimeData(data2);
        setPieData([
          data.attendanceRate,
          data.weekAchievementRate,
          data.totalAchievementRate,
        ]);
      } catch (err) {
        setTimeData(['00:00:00', '00:00:00', '00:00:00']);
      }
    };
    const getGitTimeData = async () => {
      try {
        const res = await API.get('dailysheets', useratom.id);
        const datas = res.data;
        setGetTimeGoal(datas[datas.length - 1].timeGoal);
        datas.length == 0
          ? console.log('Git데이터', gittime)
          : datas.map((data) =>
              gittime.push([data.date, toMilliseconds(data.studyTimeADay)])
            );
      } catch (error) {
        console.log(err);
      }
    };
    const getMyRoom = async () => {
      const res = await API.get('studyrooms', useratom.id);
      const data = res.data;
      setMyroomInfos(data);
    };
    getTimeData();
    getGitTimeData();
    setGitTime(gittime);
    getMyRoom();
  }, [user]);
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
    <>
      {user && (
        <div className="flex-col py-[50px] lg:px-[200px]">
          <div className="flex flex-row justify-between">
            <div className="font-bold text-3xl text-center lg:text-left">
              <BoldText text={`${user.name}님의 최근공부기록`} />
            </div>
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
          </div>
          <div className="flex flex-col items-center  lg:flex-row justify-evenly">
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
            <BoldText text={`${user.name}님의 공부기록`} />
            <div className="pt-[10px]">
              <NoSSR gittimes={gittime} />
            </div>
          </div>

          <div className=" pt-[50px]">
            <BoldText text={`${user.name}의 공부 기록 통계`} />
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
            <div className="pt-[50px]">
              <BoldText text={`${user.name}의 공부 기록 통계`} />

              <div>
                {myroomInfos.map((myroomInfo, index) => (
                  <CategoryBox
                    key={index}
                    myroomInfo={myroomInfo}
                    color={randomColor[Math.ceil(Math.random() * 10) + 1]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

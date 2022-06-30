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
        const totaltime = await API.get('totaltime', useratom.id);
        const data = totaltime.data;
        console.log(data, 'data');
        var data2 = [
          data.studyTimeADay,
          data.weekStudyTime,
          data.totalStudyTime,
        ];
        setTimeData(data2);

        const dailysheets = await API.get('dailysheets', useratom.id);
        const datas = dailysheets.data;
        console.log(datas, 'dddd');
        setGetTimeGoal(datas[datas.length - 1].timeGoal);
        setPieData([
          data.attendanceRate,
          data.weekAchievementRate,
          datas[datas.length - 1].bestStudyTime,
        ]);
        console.log(pieData, 'PieData');
        datas.length == 0
          ? console.log('Git데이터', gittime)
          : datas.map((data) =>
              gittime.push([data.date, toMilliseconds(data.studyTimeADay)])
            );
      } catch (err) {
        setTimeData(['00:00:00', '00:00:00', '00:00:00']);
        setPieData([0, 0, 0]);
      }
    };
    const getGitTimeData = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    const getMyRoom = async () => {
      const res = await API.get('studyrooms', useratom.id);
      const data = res.data;
      console.log(data);
      setMyroomInfos(data);
    };
    getTimeData();
    getGitTimeData();
    setGitTime(gittime);
    getMyRoom();
  }, []);
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
    <div className="">
      {user && (
        <div className="flex-col py-[50px] lg:px-[200px]">
          <div className="pt-[20px] ">
            <BoldText text={`1년 공부 기록`} />
            <div className="pt-[10px] shadow-xl my-[10px]">
              <NoSSR gittimes={gittime} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="font-bold text-3xl text-center lg:block text-left my-[50px]">
              <BoldText text={`${user.name}님의 최근 공부 기록`} />
            </div>
            <span className="hidden text-center sm:block m-2 lg:text-left my-[45px]">
              <span className="  py-1 px-2">오늘의 목표 공부</span>
              <input
                className="text-center w-[70px] border border-amber-400 rounded-md "
                value={timeGoal}
                onChange={(e) => setTimeGoal(e.target.value)}
              ></input>
              <span className=" mr-3"> 시간</span>
              <Button text={'설정'} onClick={clickHandler}></Button>
            </span>
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
            <div className="pt-[50px]">
              <BoldText text={`최근 공부한 방`} />

              <div>
                {myroomInfos.map((myroomInfo, index) => (
                  <>
                    <CategoryBox
                      key={index}
                      myroomInfo={myroomInfo}
                      color={randomColor[Math.ceil(Math.random() * 10) + 1]}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

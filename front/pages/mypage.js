import BoldText from '../components/common/BoldText';
import TimeBox from '../components/common/TimeBox';
import dynamic from 'next/dynamic';
import Pie from '../components/common/Pie';
import Button from '../components/common/Button';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userAtom,
  userDescriptionAtom,
  userNameAtom,
} from '../core/atoms/userState';
import * as API from '../pages/api/api';
import {
  randomColor,
  charts_data,
  charts_color,
} from '../components/common/UseData';
export default function mypage() {
  const userName = useRecoilValue(userAtom);
  const [timeDatas, setTimeData] = useState(null);
  const [user, setUser] = useRecoilState(userAtom);
  const [gittime, setGitTime] = useState([]);
  const [timeGoal, setTimeGoal] = useState();
  const [getTimeGoal, setGetTimeGoal] = useState();

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
    const getTimeData = async () => {
      try {
        const res = await API.get('totaltime', user.id);
        console.log('res', res);
        var data2 = [];
        const data = res.data;
        data2 = [data.studyTimeADay, data.totalStudyTime, data.weekStudyTime];
        setTimeData(data2);
      } catch (err) {
        console.log('시간을 가져오는데 실패하였습니다.');
        setTimeData(['00:00:00', '00:00:00', '00:00:00']);
      }
    };
    const getGitTimeData = async () => {
      const res = await API.get('dailysheets', user.id);
      console.log(res);
      const datas = res.data;
      console.log(datas[0].timeGoal);
      setGetTimeGoal(datas[0].timeGoal);
      datas.length == 0
        ? console.log('Git데이터', gittime)
        : datas.map((data) =>
            gittime.push([data.date, toMilliseconds(data.studyTimeADay)])
          );
    };

    getTimeData();
    getGitTimeData();
    setGitTime(gittime);
  }, []);
  async function clickHandler(e) {
    {
      e.type === 'change'
        ? setTimeGoal(e.target.value)
        : await API.put('dailysheet', { timeGoal: timeGoal + ':00:00' });
    }
  }
  return (
    <div class="flex-col py-[50px] lg:px-[200px]">
      <div class="flex flex-row justify-between">
        <BoldText text={`${userName?.name}님의 최근 공부시간`} />
        <span class="hidden sm:block">
          <span className="bg-sky-500 text-white font-bold py-1 px-3 mx-2 rounded-full">
            일일 목표
          </span>
          <input
            class="text-center w-[70px] border-2 rounded-xl border-orange-300"
            value={timeGoal}
            onChange={(e) => clickHandler(e)}
          ></input>
          <span class=" mr-3">시간</span>
          <Button text={'설정'} onClick={clickHandler}></Button>
        </span>
      </div>
      <div class="flex flex-col items-center  lg:flex-row justify-evenly">
        {timeDatas?.map((time, index) => (
          <TimeBox index={index} timeData={time} timeGoal={getTimeGoal} />
        ))}
      </div>
      <div class="pt-[50px] ">
        <BoldText text={`${userName?.name}님의 공부기록`} />
        <div class="pt-[10px]">
          <NoSSR gittimes={gittime} />
        </div>
      </div>

      <div class=" pt-[50px]">
        <BoldText text={`${userName?.name}의 공부 기록 통계`} />
        <div class="flex flex-col items-center  lg:flex-row justify-evenly">
          {charts_data.map((title) => (
            <div class="py-8 lg:mr-[30px]">
              <Pie
                title={title}
                color={charts_color[Math.ceil(Math.random() * 10) + 1]}
              />
            </div>
          ))}
        </div>
        {/* <div class="my-[100px] min-w-[1000px]">
                
                    {
                        category_time.map((category)=>(<CategoryBox category={category} />))
                    }
                    
            </div> */}
      </div>
    </div>
  );
}

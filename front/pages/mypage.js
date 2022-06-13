import BoldText from '../components/common/BoldText'
import TimeBox from '../components/common/TimeBox'
import dynamic from "next/dynamic";
import Pie from '../components/common/Pie'
import CategoryBox from '../components/common/CategoryBox';
import {useEffect, useState} from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    userAtom,
    userDescriptionAtom,
    userNameAtom,
  } from '../core/atoms/userState';
import * as API from '../pages/api/api';
import {randomColor,charts_data,charts_color} from "../components/common/UseData"
  export default function mypage()
{
    const userName = useRecoilValue(userAtom);
    const [timeDatas,setTimeData]=useState(null)
    const [user, setUser] = useRecoilState(userAtom);

    const NoSSR = dynamic(
        () => import("../components/common/Heatmap"),
        {
          ssr: false,
        }
      );
      function toMilliseconds(studyTimeADay) {
        //HH:MM:SS
        //시 * 60 * 60 * 1000
        //분 * 60 * 1000
        //초 * 1000
        const studyTimeADayNum = Number(studyTimeADay.slice(0, 2)) * 60 * 60 * 1000 + Number(studyTimeADay.slice(3, 5)) * 60 * 1000 + Number(studyTimeADay.slice(6)) * 1000;
        
        return studyTimeADayNum/1000;
    }
      useEffect(() =>  {
        console.log(userName.name)
        try {
            const getTimeData = async () => {
              const res = await API.get(`totaltime`,user.id);
              const data = res.data;
              const data2=[data.studyTimeADay,data.totalStudyTime,data.weekStudyTime]
              const gitTime=toMilliseconds(data.studyTimeADay)
              console.log(gitTime)
              setTimeData(data2);
            };

            getTimeData();
          } catch (err) {
            console.log('시간을 가져오는데 실패하였습니다.', err);
          }
      }, []);
    return(
    
    <div class="flex-col px-[300px] py-[50px]">
        <div class="min-w-[350px]">
        <BoldText Text={"주완님의 최근 공부시간"}/>
        </div>
        <div class="flex justify-between min-w-[1000px]">
        {
            timeDatas?.map((time,index)=> <TimeBox index={index} color={randomColor[Math.round((Math.random()*15)%14)]} timeData={time}/>)
        }
        
        </div>
        <div class=" pt-[50px]">
        <BoldText Text={"주완님의 공부기록"}/>    
        <div class="pt-[10px]">

        <NoSSR />
        </div>
        </div>

        <div class="min-w-[350px] pt-[50px]">
        <BoldText Text={"주완님의 공부 기록 통계"}/>
            <div class="flex justify-between mt-[30px] min-w-[1000px]">
                {
                    charts_data.map((title,index)=>(
                    <div class="mr-[30px]">
                    <Pie title={title} color={charts_color[Math.ceil(Math.random()*10)+1]}/>
                    </div>
                    ))
                }
            </div>
            {/* <div class="my-[100px] min-w-[1000px]">
                
                    {
                        category_time.map((category)=>(<CategoryBox category={category} />))
                    }
                    
            </div> */}
        </div>
    </div>)
}
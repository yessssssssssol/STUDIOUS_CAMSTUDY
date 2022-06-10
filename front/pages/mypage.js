import BoldText from '../components/common/BoldText'
import TimeBox from '../components/common/TimeBox'

import Pie from '../components/common/Pie'
import { useEffect } from 'react'
export default function mypage()
{
    const charts_data=[["출석율","#ffefd5"],["목표 달성률","#8ee69a"],["일일 최다 공부시간","#b999f3"]]
    const Title_time=["오늘 공부 시간","이번주 공부 시간","전체 공부 시간"]
    const randomColor=["red","blue","green"]

    useEffect(()=>{
        console.log(Math.ceil((Math.random()*15)%14))
    },[])
    return(
    <div class="px-[300px] py-[50px]">
        <div class="min-w-[350px]">
        <BoldText Text={"주완님의 최근 공부시간"}/>
        </div>
        <div class="flex justify-between min-w-[1000px]">
        {
            Title_time.map((title,index)=> <TimeBox Title={title} color={randomColor[index]}/>)
        }
        
        </div>
        <div class="min-w-[350px] pt-[50px]">
        <BoldText Text={"주완님의 공부기록"}/>
        </div>

        <div class="min-w-[350px] pt-[50px]">
        <BoldText Text={"주완님의 공부 기록 통계"}/>
            <div class="flex mt-[50px] min-w-[1000px]">
                {
                    charts_data.map((chart)=>(
                    <div class="w-[350px] ml-[80px]">
                    <Pie chart={chart} />
                    </div>))
                }
            </div>
        </div>
    </div>)
}
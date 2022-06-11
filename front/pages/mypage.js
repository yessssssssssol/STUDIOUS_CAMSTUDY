import BoldText from '../components/common/BoldText'
import TimeBox from '../components/common/TimeBox'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import Pie from '../components/common/Pie'
export default function mypage()
{
    const charts_data=[["출석율","#ffefd5"],["목표 달성률","#8ee69a"],["일일 최다 공부시간","#b999f3"]]
    const Title_time=["오늘 공부 시간","이번주 공부 시간","전체 공부 시간"]
    const randomColor=["red","blue","green"]
    var data = [{
        "date": "2016-01-01",
        "total": 17164,
        "details": [{
          "name": "Project 1",
          "date": "2016-01-01 12:30:45",
          "value": 9192
        }, {
          "name": "Project 2",
          "date": "2016-01-01 13:37:00",
          "value": 6753
        }]}]
    return(
    <div class="flex-col px-[300px] py-[50px]">
        <div class="min-w-[350px]">
        <BoldText Text={"주완님의 최근 공부시간"}/>
        </div>
        <div class="flex justify-between min-w-[1000px]">
        {
            Title_time.map((title,index)=> <TimeBox Title={title} color={randomColor[index]}/>)
        }
        
        </div>
        <div class="pt-[50px]">
        <BoldText Text={"주완님의 공부기록"}/>
                <div class="flex justify-between min-w-[1000px] pt-[30px]" >
                <CalendarHeatmap
                    startDate={new Date('2022-01-01')}
                    endDate={new Date('2022-12-30')}
                    gutterSize={1}
                    horizontal={true}
                    values={[
                        { date: '2022-01-02', count: 5 },
                        { date: '2022-01-22', count: 122 },
                        { date: '2022-01-29', count: 38 },
                        { date: '2022-01-15', count: 12 },
                        { date: '2022-01-17', count: 122 },
                        { date: '2022-01-28', count: 38 },
                    ]}
                    />
                </div>
        </div>

        <div class="min-w-[350px] pt-[50px]">
        <BoldText Text={"주완님의 공부 기록 통계"}/>
            <div class="flex justify-between mt-[30px] min-w-[1000px]">
                {
                    charts_data.map((chart)=>(
                    <div class="mr-[30px]">
                    <Pie chart={chart} />
                    </div>
                    ))
                }
            </div>
        </div>
    </div>)
}
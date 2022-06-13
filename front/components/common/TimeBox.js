export default function TimeBox({color,timeData,index})

{
    const title=["오늘 공부 시간","이번주 공부 시간","전체 공부 시간"]

    return(<div class={`${color} rounded-[50px] w-[320px] h-[125px] mt-[30px]`}>
        <div class="font-bold pt-[10px] text-center">{title[index]}</div>
        <div class="text-center text-5xl pt-[10px]">{timeData}</div>
    </div>)
}
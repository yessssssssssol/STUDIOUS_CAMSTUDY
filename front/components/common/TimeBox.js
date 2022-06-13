import {useEffect} from "react"



export default function TimeBox({title,color})
{
    
    return(<div class={`bg-green-100 w-[320px] h-[125px] mt-[30px]`}>
        <div class="font-bold pt-[10px] text-center">{title}</div>
        <div class="text-center text-5xl pt-[10px]">00:40:20</div>
    </div>)
}
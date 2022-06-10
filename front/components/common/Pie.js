import {PieChart} from "react-minimal-pie-chart"
import { Fragment } from "react";

export default function Pie({chart}){
    return(
        <PieChart
            data={[
                {
                    value:70,
                    color:chart[1],
                    name:"name1",
                },
            ]}
        reveal={70}
        lineWidth={10}
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        startAngle={270}
        animationDuration={1500}
        label={({dataEntry}) => chart[0]+dataEntry.value+"%"}
        labelStyle={{
            whiteSpace: 'pre',
            maxWidth:"200",
            fontSize:"10px",
        }}
        labelPosition={0}
        />
    )
}
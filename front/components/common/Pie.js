import {PieChart} from "react-minimal-pie-chart"
import {useState } from "react";

export default function Pie({title,color}){
    

    
    const label_Style = {
            fontSize:"7px",
            paddingTop:"50px",
            fontWeight:"500",
            whiteSpace: "pre-line"
    }
    
    return(
        <PieChart
            data={[
                {
                    value:70,
                    color:color,
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
        label={({dataEntry}) => `${title} \n  ${dataEntry.value}%`}
        labelStyle={{
            ...label_Style,
        }}
        center={[50,50]}
        labelPosition={0}
        />    
    )
}
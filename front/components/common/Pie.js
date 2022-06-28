import { PieChart } from 'react-minimal-pie-chart';
import { useState } from 'react';

export default function Pie({ title, color, index, pieData }) {
  return (
    <>
      {pieData[index] !== undefined && (
        <PieChart
          data={[
            {
              value: pieData[index],
              color: color,
            },
          ]}
          reveal={pieData[index]}
          lineWidth={15}
          background="#f3f3f3"
          lengthAngle={360}
          rounded
          animate
          startAngle={270}
          animationDuration={3000}
          label={({ dataEntry }) => `${title}  ${dataEntry.value}%`}
          labelStyle={{
            fontSize: '7px',
            fontWeight: '500',
          }}
          center={[50, 50]}
          labelPosition={0}
        />
      )}
    </>
  );
}

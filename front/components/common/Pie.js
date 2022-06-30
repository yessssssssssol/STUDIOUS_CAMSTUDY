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
              color: '#fde68a',
            },
          ]}
          reveal={pieData[index]}
          lineWidth={15}
          background="#fafafa"
          lengthAngle={360}
          rounded
          animate
          startAngle={270}
          animationDuration={3000}
          label={({ dataEntry }) => `${title} ${dataEntry.value}%`}
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

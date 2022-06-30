import { PieChart } from 'react-minimal-pie-chart';

function Label({ x, y, dx, dy, pieData, title }) {
  return (
    <text x={x} y={y} dx={dx} dy={dy} fontSize="6px" fontWeight="500">
      {title + ' ' + pieData}
    </text>
  );
}

export default function Pie({ title, pieData, index }) {
  console.log(pieData);

  return (
    <>
      {pieData !== undefined &&
        (index === 2 ? (
          <PieChart
            data={[
              {
                value: 0,
                color: '#3feaef',
              },
            ]}
            reveal={pieData}
            lineWidth={15}
            background="#fafafa"
            lengthAngle={360}
            rounded
            animate
            startAngle={270}
            animationDuration={3000}
            label={({}) => {
              return (
                <Label
                  x={13}
                  y={53}
                  dx={0}
                  dy={0}
                  pieData={pieData}
                  title={title}
                />
              );
            }}
            labelStyle={{
              fontSize: '7px',
              fontWeight: '500',
            }}
            center={[50, 50]}
            labelPosition={0}
          />
        ) : (
          <PieChart
            data={[
              {
                value: pieData || 0,
                color: '#fde68a',
              },
            ]}
            reveal={pieData}
            lineWidth={15}
            background="#fafafa"
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
        ))}
    </>
  );
}

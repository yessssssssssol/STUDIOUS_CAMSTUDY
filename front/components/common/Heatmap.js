import { useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export default function Heatmap({ gittimes }) {
  var result = [];

  //   gittimes.length == 0
  //     ? result.push({
  //         date: '2022-06-30',
  //         total: 0,
  //         details: [
  //           {
  //             name: '공부시간 ',
  //             value: 0,
  //           },
  //         ],
  //       })
  //     : gittimes.map((gittime) => {
  //         result.push({
  //           date: gittime[0],
  //           total: gittime[1],
  //           details: [
  //             {
  //               name: '공부시간 ',
  //               value: gittime[1],
  //             },
  //           ],
  //         });
  //       });

  var data = result;
  const today = new Date();

  const randomValues = getRange(200).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });
  return (
    <CalendarHeatmap
      showMonthLabels={false}
      showOutOfRangeDays={true}
      gutterSize={3}
      values={randomValues}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-github-${value.count}`;
      }}
    ></CalendarHeatmap>
  );
  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

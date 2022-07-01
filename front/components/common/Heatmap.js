import { useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

export default function Heatmap({ gittimes }) {
  var result = [];
  gittimes.length == 0
    ? result.push({
        date: 0,
        count: 0,
      })
    : gittimes.map((gittime) => {
        result.push({
          date: gittime[0],
          count: gittime[1],
        });
      });

  //   const today = new Date();

  //   const randomValues = getRange(200).map((index) => {
  //     return {
  //       date: shiftDate(today, -index),
  //       count: getRandomInt(0, 5),
  //     };
  //   });
  // function shiftDate(date, numDays) {
  //     const newDate = new Date(date);
  //     newDate.setDate(newDate.getDate() + numDays);
  //     return newDate;
  //   }

  //   function getRange(count) {
  //     return Array.from({ length: count }, (_, i) => i);
  //   }

  //   function getRandomInt(min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  //   }
  return (
    <CalendarHeatmap
      startDate={new Date('2022-1-01')}
      endDate={new Date('2022-12-30')}
      showMonthLabels={false}
      showOutOfRangeDays={true}
      gutterSize={3}
      values={result}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-github-${value.count}`;
      }}
    ></CalendarHeatmap>
  );
}

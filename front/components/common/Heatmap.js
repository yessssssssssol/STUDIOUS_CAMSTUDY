import { useEffect } from 'react';
import CalendarHeatmap from 'reactjs-calendar-heatmap';

export default function Heatmap({ gittimes }) {
  var result = [];

  gittimes.length == 0
    ? result.push({
        date: '2022-06-30',
        total: 0,
        details: [
          {
            name: '공부시간 ',
            value: 0,
          },
        ],
      })
    : gittimes.map((gittime) => {
        result.push({
          date: gittime[0],
          total: gittime[1],
          details: [
            {
              name: '공부시간 ',
              value: gittime[1],
            },
          ],
        });
      });

  var data = result;

  return (
    <CalendarHeatmap
      data={data}
      overview={'year'}
      color={'#fbbf24'}
    ></CalendarHeatmap>
  );
}

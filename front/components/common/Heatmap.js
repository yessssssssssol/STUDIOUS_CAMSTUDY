import CalendarHeatmap from 'reactjs-calendar-heatmap'

export default function Heatmap () {
    var data = [{
        "date": "2022-01-15",
        "total": 5640,
        "details": [ {
          "name": "공부시간 ",
          "value": 3500
        },
        {
            "name": "공부시간 ",
            "value": 2140
        }
    ]},
    {
        "date": "2022-01-20",
        "total": 5640,
        "details": [ {
          "name": "수학 ",
          "value": 2500
        },
        {
            "name": "과학 ",
            "value": 2140
        }
    ]}
]
    
    return(
         <CalendarHeatmap data={data}></CalendarHeatmap>
    )
}

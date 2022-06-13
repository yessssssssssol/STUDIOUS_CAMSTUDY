import CalendarHeatmap from 'reactjs-calendar-heatmap'

export default function Heatmap () {
    var data = [{
        "date": "2022-06-14",
        "total": 17164,
        "details": [{
            "name": "공부시간 ",
            "value": 17164
          }]
    },{
        "date": "2022-06-15",
        "total": 10000,
        "details": [{
            "name": "공부시간 ",
            "value": 17164
          }]
    },{
        "date": "2022-06-16",
        "total": 30000,
        "details": [{
            "name": "공부시간 ",
            "value": 17164
          }]
    }]
    
    return(
         <CalendarHeatmap data={data} overview={"day"}></CalendarHeatmap>
    )
}

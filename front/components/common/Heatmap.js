import CalendarHeatmap  from "reactjs-calendar-heatmap";

export default function Heatmap(){
    var data = [{
        "date": "2022-01-15",
        "total": 156488,
        "details": [ {
          "name": "수학 ",
          "date": "2022-01-15 13:37:00",
          "value": 150
        },
        {
            "name": "과학 ",
            "date": "2022-01-15 13:37:00",
            "value": 100000
          }
    ]}]

    return(
        <CalendarHeatmap data={data} overview={"year"}></CalendarHeatmap>
    )
}
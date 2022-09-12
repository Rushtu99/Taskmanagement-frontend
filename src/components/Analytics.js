import React from "react";
import Highcharts from "highcharts";
import { useSelector } from "react-redux";
import HighchartsReact from "highcharts-react-official";
import { Card } from "react-bootstrap";

export const Analytics = () => {
  const user = useSelector((state) => state.user);
  const task = useSelector((state) => state.task);
  

  

  const optionsPie = {
    chart: {
      height: 40 + "%",
      // width: 700,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Task Details",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y} </b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Tasks Details",
        colorByPoint: true,
        data: [
          {
            name: "Completed",
            y: task.count.completed,
            sliced: true,
            selected: true,
          },
          {
            name: "Assigned",
            y: task.count.assigned,
          },
          {
            name: "In Progress",
            y: task.count.inProgress,
          },
        ],
      },
    ],
  };
  return (
    <Card>
      <div>
        <div className="button-refresh">
          {/* <Button onClick={analytics} className="refresh" variant="light">
            &#8634;
          </Button> */}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "48%" }}>
            <HighchartsReact highcharts={Highcharts} options={optionsPie} />
          </div>
          <div style={{ width: "48%", marginLeft: "auto", margin: '8px' }}>
            <Card>
              <div className="float">
                <div className="item"> UserID:</div>
                <div className="item2">{user.data.id}</div>
              </div>
              <div className="float">
                <div className="item">Name: </div>
                <div className="item2">{user.data.name}</div>
              </div>
              <div className="float">
                <div className="item">Email: </div>
                <div className="item2">{user.data.email}</div>
              </div>
              <div className="float">
                <div className="item">created_at: </div>
                <div className="item2">{user.data.created_at}</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

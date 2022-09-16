import React from "react";
import Highcharts from "highcharts";
import { useSelector } from "react-redux";
import HighchartsReact from "highcharts-react-official";
import { Card, Button } from "react-bootstrap";

export const Analytics = () => {
  const user = useSelector((state) => state.user);
  const task = useSelector((state) => state.task);

  const analytics = () => {
    console.log(task.data[0].id);
  };

  const optionsPieTo = {
    chart: {
      height: 40 + "%",
      // width: 700,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Task Assigned To You",
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
            y: task.to.completed,
          },
          {
            name: "Assigned",
            y: task.to.assigned,
          },
          {
            name: "In Progress",
            y: task.to.inProgress,
            sliced: true,
            selected: true,
          },
        ],
      },
    ],
  };
  const optionsPieBy = {
    chart: {
      height: 40 + "%",
      // width: 700,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Task Assigned By You",
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
            y: task.by.completed,
          },
          {
            name: "Assigned",
            y: task.by.assigned,
          },
          {
            name: "In Progress",
            y: task.by.inProgress,
            sliced: true,
            selected: true,
          },
        ],
      },
    ],
  };
  return (
    <Card>
      <div>
        <div className="button-refresh">
          <Button onClick={analytics} className="refresh" variant="light">
            &#8634;
          </Button>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "47%" }}>
            <HighchartsReact highcharts={Highcharts} options={optionsPieTo} />
          </div>
          <div style={{ width: "47%", marginLeft: "auto", margin: "8px" }}>
            <HighchartsReact highcharts={Highcharts} options={optionsPieBy} />
            {/* <Card>
              Most Recent Task
              <div className="float">
                <div className="item"> taskID:</div>
                <div className="item2">
                  {task.data.data[task.data.data.length - 1].id}
                </div>
              </div>
              <div className="float">
                <div className="item">Title: </div>
                <div className="item2">
                  {task.data.data[task.data.data.length - 1].title}
                </div>
              </div>
              <div className="float">
                <div className="item">Description: </div>
                <div className="item2">
                  {task.data.data[task.data.data.length - 1].desc}
                </div>
              </div>
              <div className="float">
                <div className="item">Deadline: </div>
                <div className="item2">
                  {task.data.data[task.data.data.length - 1].due_date}
                </div>
              </div>
              <div className="float">
                <div className="item">Assigned By: </div>
                <div className="item2">
                  {task.data.data[task.data.data.length - 1].assigned_by}
                </div>
              </div>
              <div className="float">
                <div className="item">Current Status: </div>
                <div className="item2">
                  {task.data.data[task.data.data.length - 1].status}
                </div>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

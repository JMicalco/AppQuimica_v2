import React from "react";
import Chart from "../components/chart";
import Chartjs from "../components/canvasjsChart";
import Component1 from "../components/dropDown1";
import CanvasJSReact from './canvasjs.react';


const middle = () => {
  return (
    <div className="line-chart">
      <div className="cnic">
        <div className="seven">
          <Component1/>
        </div>
      </div>
    </div>
  );
};

export default middle;

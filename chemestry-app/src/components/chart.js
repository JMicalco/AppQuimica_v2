import React, { Component } from "react";
import ChartEx from "./chartEx";
import Metodos from "../clases/metodos";

class Chart extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    // const datos = [
    //   {
    //     uv: 10000,
    //     pv: 2400,
    //   },
    //   {
    //     uv: 3000,
    //     pv: 1398,
    //   },
    //   {
    //     uv: 2000,
    //     pv: 9800,
    //   },
    //   {
    //     uv: 2780,
    //     pv: 3908,
    //   },
    //   {
    //     uv: 1890,
    //     pv: 4800,
    //   },
    //   {
    //     uv: 2390,
    //     pv: 3800,
    //   },
    //   {
    //     uv: 3490,
    //     pv: 4300,
    //   },
    //   {
    //     uv: 4495,
    //     pv: 4300,
    //   },
    // ];
    this.setState({ data: Metodos.respuesta });
    console.log(Metodos.respuesta);
  };

  render() {
    return <ChartEx data={this.state.data} />;
  }
}

export default Chart;

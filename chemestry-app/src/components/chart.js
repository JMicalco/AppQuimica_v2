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
    this.setState({ data: Metodos.respuesta });
    console.log(Metodos.respuesta);
  };

  render() {
    return <ChartEx data={this.state.data} />;
  }
}

export default Chart;

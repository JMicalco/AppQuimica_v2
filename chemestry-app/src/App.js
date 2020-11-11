import React, { Component } from "react";
import Dark from "./components/darkButton";
import Header from "./components/header";
import One from "./components/one";
import DropDown1 from "./components/dropDown1";
import Three from "./components/three";
import Four from "./components/four";
import Six from "./components/six";
import Nine from "./components/nine";
import obj from "./clases/metodos";
import "./App.css";
import CanvasJSReact from "./components/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [];
var xVal = dps.length + 1;
var yVal2 = 0;
var dps2 = [];
var yVal = 15;
var updateInterval = 150;
var i = 0;
var contadornic = 0;
var cont2 = 0;

class App extends Component {
  constructor() {
    super();
    i = obj.bandera;
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    i = obj.bandera;
    setInterval(this.updateChart, updateInterval);
  }
  updateChart() {
    var arreglo = obj.getnic();

    contadornic = arreglo[11].x;

    yVal = arreglo[i % 12].x;
    xVal = arreglo[i % 12].y;
    yVal2 = arreglo[i % 12].x2;
    
    cont2++;
    
    if (yVal != contadornic) {
      dps.push({ x: xVal, y: yVal });
      dps2.push({ x: yVal2, y: yVal });

      i++;

      if (dps.length > 11) {
        dps.shift();
        dps2.shift();
      }
    }

    this.chart.render();
  }

  state = {
    name: "Temperatura/Presión",
    show: false,
    i: 0,
    cont2: 0,
    nameG: "Temperatura/Presión",
  };

  hide = () => {
    this.setState({
      show: false,
    });
    this.i = 0;
    this.cont2 = 0;
  };

  show = () => {
    this.setState({
      show: true,
    });
    this.i = 0;
    this.cont2 = 0;
  };

  barChangeHandler = (event) => {
    if (event.target.value === "Temperatura") {
      this.setState({
        name: "Presión",
        nameG: "Temperatura",
      });
    } else {
      this.setState({
        name: "Temperatura",
        nameG: "Presion",
      });
    }
  };

  onChange = () => {
    i = 0;
    cont2 = 0;
  };

  onChange2 = () => {
    i = 0;
    console.log("on change ");
  };


  render() {
    i = 0;
    cont2 = 0;
    dps = [];
    dps2 = [];
    var options = {
      zoomEnabled: true,
      zoomType: "xy",

      title: {
        text: "Gráfica",
      },
      axisX: {
        title: "Fracciones Molares",
      },
      axisY: {
        title: this.state.nameG, 
      },
      data: [
        {
          type: "line",
          showInLegend: true,
          legendText: "Gaseosa",
          dataPoints: dps,
        },
        {
          type: "line",
          dataPoints: dps2,
          showInLegend: true,
          legendText: "Liquida",
        },
      ],
    };
    return (
      <div className="App">
        <div className="dark">
          <Dark />
        </div>
        <Header onClick={this.barChangeHandler} />
        <div className="wrapper">
          <One name={this.state.name} onChange={this.onChange} />
          <div className="line-chart">
            <CanvasJSChart
              options={options}
              onRef={(ref) => (this.chart = ref)}
              zoomEnabled={true}
            />
            <div className="cnic">
              <div className="seven">
                <DropDown1 onChange={this.onChange2} />
              </div>
            </div>
          </div>
          <Three
            onClickShow={() => this.show()}
            onClickHide={() => this.hide()}
          />
          {this.state.show ? <Four onClick={this.onChange} /> : null}
          <Six nameG={this.state.nameG} onClick={this.onChange}/>
          
        </div>
      </div>
    );
  }
}

export default App;

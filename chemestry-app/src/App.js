import React, { Component } from "react";
import Dark from "./components/darkButton";
import Header from "./components/header";
import Slider from "./components/ComponentSliderText";
import DropDown1 from "./components/dropDown1";
import Solution from "./components/ComponentSolution";
import Methods from "./components/ComponentMLW";
import Six from "./components/ComponentMolarFractions";
import Azeotrope from "./components/ComponentAzeotrope";
import obj from "./clases/metodos";
import "./App.css";
import CanvasJSReact from "./components/canvasjs.react";
import Footer from "./components/footer";

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

    if (yVal !== contadornic) {
      dps.push({
        x: parseFloat(xVal.toFixed(2)),
        y: parseFloat(yVal.toFixed(2)),
      });
      dps2.push({
        x: parseFloat(yVal2.toFixed(2)),
        y: parseFloat(yVal.toFixed(2)),
      });

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
        nameG: "Temperatura C°",
      });
    } else {
      this.setState({
        name: "Temperatura",
        nameG: "Presion mmHg",
      });
    }
  };

  onChange = () => {
    i = 0;
    cont2 = 0;
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
        // text: "Equilibrio Líquido-Vapor",
        text:
          this.state.name === "Presión"
            ? "Equilibrio Líquido-Vapor a Presión Constante"
            : "Equilibrio Líquido-Vapor a Temperatura Constante",
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
          legendText: "Vapor",
          dataPoints: dps,
        },
        {
          type: "line",
          dataPoints: dps2,
          showInLegend: true,
          legendText: "Líquido",
        },
      ],
    };
    return (
      <div className="App">
        <div className="dark"></div>
        <Header onClick={this.barChangeHandler} />
        <div className="wrapper">
          <Slider name={this.state.name} onChange={this.onChange} />
          <div className="line-chart">
            <CanvasJSChart
              options={options}
              onRef={(ref) => (this.chart = ref)}
              zoomEnabled={true}
            />
            <div className="cnic">
              <div className="seven">
                <DropDown1 onChange={this.onChange} />
                <Azeotrope />
              </div>
            </div>
          </div>
          <Solution
            onClickShow={() => this.show()}
            onClickHide={() => this.hide()}
          />
          {this.state.show ? <Methods onClick={this.onChange} /> : null}
          <Six nameG={this.state.nameG} onClick={this.onChange} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Dark from "./components/darkButton";
import Header from "./components/header";
import One from "./components/one";
import Middle from "./components/middle";
import Three from "./components/three";
import Four from "./components/four";
import Six from "./components/six";
import Nine from "./components/nine";
import obj from "./clases/metodos";
import "./App.css";
import CanvasJSReact from './components/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [/*{x: 0, y: 10}, {x: 0.1, y: 13}, {x: 0.2, y: 18}, {x: 0.3, y: 20}, {x: 0.4, y: 17},{x: 0.5, y: 10}, {x: 0.6, y: 13}, {x: 0.7, y: 18}, {x: 0.8, y: 20}, {x: 0.9, y: 17}, {x:1,y:2}*/];   //dataPoints.
var xVal = dps.length + 1;
var yVal2=0;
var dps2=[];
var yVal = 15;
var updateInterval = 1000;
var i=0;
var contadornic=0;
var cont2=0;
var contadornic2=0;

class App extends Component {
  constructor() {
    super();
    i=obj.bandera;
		this.updateChart = this.updateChart.bind(this);
	}
	componentDidMount() {
    i=obj.bandera;
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
    //dps.shift();
    //dps.push([{x:1.5,y:6},{x:2,y:7}]);
    //dps.pop();
    var arreglo=obj.getnic();
   //var c=obj.getcambio();
    //console.log(arreglo)
    contadornic=arreglo[11].x;
    contadornic2=arreglo[11].x2;
    //console.log(obj.orquestador("*","","","","",""));
    //console.log(arreglo[2].y);
    //console.log(obj.orquestador("*","","","","",""));
   yVal = arreglo[i%12].x;
   xVal = arreglo[i%12].y;
   yVal2= arreglo[i%12].x2;
  //console.log(yVal2);
    cont2++;
    //console.log(obj.respuesta);
    //console.log(contadornic);
    //console.log(c);
    if(yVal!=contadornic){
      dps.push({x: xVal,y: yVal});
      //dps2.push({x: yVal2,y: yVal});
      //console.log(dps2);
      i++;
      //console.log(xVal);
      //contadornic++;
      /* if (dps.length >  12  && dps2.length>12) {
        dps.shift(); 
        dps2.shift();
      }*/
      if (dps.length >  12) {
        dps.shift(); 
        //dps2.shift();
      }
    }
      
    if(cont2==12){
      dps.shift();
      //dps2.shift();
    }

    this.chart.render();
  }
  /*  dps.push({x: xVal,y: yVal});
    i++;
    console.log(xVal);
    //contadornic++;
    if (dps.length >  12 ) {
      dps.shift();
    }*/
  
    //contadornic=0;
    
  state = {
    name: "Temperatura/Presión",
    show: false,
    i:0,
    cont2:0,
  };

  hide = () => {
    this.setState({
      show: false,
    });
    this.i=0;
    this.cont2=0;
  };

  show = () => {
    this.setState({
      show: true,
    });
    this.i=0;
    this.cont2=0;
  };

  /*clickIdeal=(variable,constante)=>{
    console.log(obj.orquestador(0,"","",variable,constante,""));
  };*/


  barChangeHandler = (event) => {
    if (event.target.value === "Temperatura") {
      this.setState({
        name: "Presión",
      });
    } else {
      this.setState({
        name: "Temperatura",
      });
    }
  };

  onChange = (event) =>{
    i=0;
    cont2=0;
   // dps=obj.getnic();
  }

  render() {
    i=0;
    cont2=0;
    dps = [];
    dps2=[];
    const options = {
			title :{
				text: "Gráfica"
      },
      axisX:{
        title : "Fracciones Molares"
       },
       axisY:{
        title : this.state.name///!!!Cambiar
       },
			data: [{
        type: "line",
        showInLegend: true, 
        legendText: "Gaseosa",
				dataPoints : dps
			},{
				type: "line",
        dataPoints : dps2,
        showInLegend: true,
        legendText: "Liquida",
			}]
		}
    return (
      <div className="App">
        <div className="dark">
          <Dark />
        </div>
        <Header onClick={this.barChangeHandler} />
        <div className="wrapper">
          <One name={this.state.name} onChange={this.onChange} />
          <Middle/>
          <div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
          <Three
            onClickShow={() => this.show()}
            onClickHide={() => this.hide()}
          />
          {this.state.show ? <Four /> : null}
          <Six name={this.state.name} />
          <Nine />
        </div>
      </div>
    );
  }
}

export default App;

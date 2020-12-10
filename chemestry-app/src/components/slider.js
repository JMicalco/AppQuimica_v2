import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import obj from "../clases/metodos";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

var variable, constante;
var valor = 21;

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 500,
    borderRadius: 20,
  },
});

function valuetext(value) {
  if (value !== valor) {
    console.log(obj.orquestador(10, "", "", variable, constante, value, 10));
    valor = value;
  }
  return `${value}°C`;
}

const marks = [
  {
    value: 10,
    label: "10°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 30,
    label: "30°C",
  },
  {
    value: 40,
    label: "40°C",
  },
  {
    value: 50,
    label: "50°C",
  },
  {
    value: 60,
    label: "60°C",
  },
  {
    value: 70,
    label: "70°C",
  },
  {
    value: 80,
    label: "80°C",
  },
  {
    value: 90,
    label: "90°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

const marksP = [
  {
    value: 100,
    label: "100 mmHg",
  },
  {
    value: 200,
    label: "200 mmHg",
  },
  {
    value: 300,
    label: "300 mmHg",
  },
  {
    value: 400,
    label: "400 mmHg",
  },
  {
    value: 500,
    label: "500 mmHg",
  },
  {
    value: 600,
    label: "600 mmHg",
  },
  {
    value: 700,
    label: "700 mmHg",
  },
  {
    value: 800,
    label: "800 mmHg",
  },
  {
    value: 900,
    label: "900 mmHg",
  },
  {
    value: 1000,
    label: "1000 mmHg",
  },
];

export default function VerticalSlider(props) {
  const classes = useStyles();
  variable = props.name;
  if (variable === "Temperatura") {
    constante = "Presion";
  } else {
    constante = "Temperatura";
  }
  return (
    <React.Fragment>
      <div className={classes.root}>
        {props.name === "Temperatura" ? (
          <Slider
            valueLabelDisplay="auto"
            orientation="vertical"
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            defaultValue={20}
            aria-labelledby="vertical-slider"
            marks={marks}
            min={10}
            max={100}
            onChange={props.onChange}
          />
        ) : null}
        {props.name === "Presión" ? (
          <Slider
            valueLabelDisplay="auto"
            orientation="vertical"
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            defaultValue={200}
            aria-labelledby="vertical-slider"
            min={100}
            max={1000}
            marks={marksP}
            onChange={props.onChange}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

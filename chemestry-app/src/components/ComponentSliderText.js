import React from "react";
import Slider from "./slider";
import TextField from "./textField"

const one = (props) => {
  return (
    <div className="one">
      <div className="container">
        <h2>{props.name}</h2>
        <div className="hey">
          <Slider name={props.name} onChange={props.onChange}/>
        </div>
        <TextField name={props.name}/>
      </div>
    </div>
  );
};

export default one;

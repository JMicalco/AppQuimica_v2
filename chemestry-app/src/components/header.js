import React from "react";
import Button from "../components/button";
import { FaTemperatureLow } from "react-icons/fa";
import { FaCloudscale } from "react-icons/fa";

const Header = (props) => {
  return (
    <div>
      <header className="App-header">
        <FaTemperatureLow color="#a56cc1" />
        <Button name="Temperatura" onClick={props.onClick}/>
        <Button name="Presión" onClick={props.onClick} />
        <FaCloudscale color="#a56cc1" />
      </header>
    </div>
  );
};

export default Header;

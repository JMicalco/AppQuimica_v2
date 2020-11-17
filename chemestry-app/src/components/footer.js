import React from "react";
import { FaFlask } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <p>Javier González</p>
        <p>Nicole Carrillo</p>
        <p>Adolfo</p>
      </div>
      <div className="icon-f">
        <FaFlask color="#cccbcb" size={30} />
      </div>
    </div>
  );
};

export default Footer;

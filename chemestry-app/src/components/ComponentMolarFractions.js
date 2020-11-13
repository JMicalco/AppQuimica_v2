import React from "react";
import ModalFL from "./modalFL";
import ModalFG from "./modalFG";


const six = (props) => {
  return (
    <div className="six">
      <h2>Fracciones molares</h2>
      <hr />
      <div className="wrap-fracciones">
        <div>
          <ModalFL name="Fase Líquida" nameG={props.nameG}/>
        </div>
        <div>
          <ModalFG name="Fase gaseosa" nameG={props.nameG} />
        </div>
      </div>
    </div>
  );
};

export default six;

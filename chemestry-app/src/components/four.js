import React from "react";
import obj from "../clases/metodos";

const handleChange = (event) => {     //!checar esto falta que exista cambios
  console.log(obj.orquestador(1,"","","","","",true));
}

const four = () => {
  return (
    <div className="four">
      <h2>Método</h2>
      <hr />
      <form action="" className="formulario-metodos">
        <div className="radio">
          <div className="radio-group">
            <input type="radio" name="Solucion Real" value="Margules" onChange={handleChange}/>
            <label htmlFor="Solucion Real">Margules</label>
          </div>
          <div className="radio-group">
            <input type="radio" name="Solucion Real" value="Wilson" onChange={handleChange}/>
            <label htmlFor="Solucion Ideal">Wilson</label>
          </div>
          <div className="radio-group">
            <input type="radio" name="Solucion Real" value="van Laar"onChange={handleChange} />
            <label htmlFor="Solucion Ideal">van Laar</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default four;

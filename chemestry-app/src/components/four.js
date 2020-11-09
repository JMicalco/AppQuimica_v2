import React from "react";

const four = () => {
  return (
    <div className="four">
      <h2>Método</h2>
      <hr />
      <form action="" className="formulario-metodos">
        <div className="radio">
          <div className="radio-group">
            <input type="radio" name="Solucion Real" value="Margules" />
            <label htmlFor="Solucion Real">Margules</label>
          </div>
          <div className="radio-group">
            <input type="radio" name="Solucion Real" value="Wilson" />
            <label htmlFor="Solucion Ideal">Wilson</label>
          </div>
          <div className="radio-group">
            <input type="radio" name="Solucion Real" value="van Laar" />
            <label htmlFor="Solucion Ideal">van Laar</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default four;

import { useState } from "react";
import "./App.css";  // Importar los estilos

function App() {
  const [display, setDisplay] = useState("");

  const agregar = (valor) => {
    if (display === "Error") setDisplay("");
    setDisplay(display + valor);
  };

  const limpiar = () => setDisplay("");

  const calcular = () => {
    try {
      if (display.includes("/0")) return setDisplay("Error");
      const resultado = eval(display);
      setDisplay(String(resultado));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="contenedor-calculadora">
      <div className="calculadora card p-4">

        <h3 className="text-center mb-3">Calculadora</h3>

        <input type="text" className="display" value={display} readOnly />

        <div className="row g-2">
          {[7, 8, 9].map((n) => (
            <div className="col-4" key={n}>
              <button className="btn btn-light w-100 py-3" onClick={() => agregar(n)}>{n}</button>
            </div>
          ))}

          {[4, 5, 6].map((n) => (
            <div className="col-4" key={n}>
              <button className="btn btn-light w-100 py-3" onClick={() => agregar(n)}>{n}</button>
            </div>
          ))}

          {[1, 2, 3].map((n) => (
            <div className="col-4" key={n}>
              <button className="btn btn-light w-100 py-3" onClick={() => agregar(n)}>{n}</button>
            </div>
          ))}

          <div className="col-4">
            <button className="btn btn-light w-100 py-3" onClick={() => agregar(0)}>0</button>
          </div>

          <div className="col-4">
            <button className="btn btn-danger w-100 py-3" onClick={limpiar}>C</button>
          </div>

          <div className="col-4">
            <button className="btn btn-success w-100 py-3" onClick={calcular}>=</button>
          </div>

          <div className="col-3">
            <button className="btn btn-info w-100 py-3" onClick={() => agregar("+")}>+</button>
          </div>
          <div className="col-3">
            <button className="btn btn-info w-100 py-3" onClick={() => agregar("-")}>-</button>
          </div>
          <div className="col-3">
            <button className="btn btn-info w-100 py-3" onClick={() => agregar("*")}>×</button>
          </div>
          <div className="col-3">
            <button className="btn btn-info w-100 py-3" onClick={() => agregar("/")}>÷</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

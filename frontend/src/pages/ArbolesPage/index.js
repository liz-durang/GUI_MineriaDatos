import React from "react";
import { ArbolesPaso0 } from "./Components/ArbolesPaso0";

function ArbolesPage() {
  return (
    <div className="page p-4">
      
      <main>
      
        <h2 className="display-4 mb-4">Árboles de Decisión</h2>
        
        <hr></hr>
        <br></br>
        <p>Es uno de los algoritmos más utilizados en el aprendizaje automático supervisado. <br></br>
          Permiten resolver problemas de regresión (pronóstico) y clasificación y admiten valores numéricos y nominales.
        </p>
        <p>Su objetivo es construir una estructura jerárquica eficiente y escalable que divide los datos en función de determinadas condiciones. 
            Para esto se utiliza la estrategia: divide y vencerás.
        </p>
      
      
      <ArbolesPaso0/>


      </main>

      
    </div>
  );
}

export { ArbolesPage }

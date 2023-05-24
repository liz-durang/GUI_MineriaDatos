import React from "react";

import { PcaPaso0 } from "./Components/PcaPaso0";
import { PcaPaso1 } from "./Components/PcaPaso1";
import { PcaPaso2 } from "./Components/PcaPaso2";

function PcaPage() {

  return (
    <>
    <div className="page p-4">
      
      <main>
      
        <h2 className="display-4 mb-4">Análisis de Componentes Principales</h2>
        
        <hr></hr>
        <br></br>
        <p>Con este algoritmo se intenta encontrar una estructura donde la varianza de los datos sea mayor, es decir, donde hay una mayor dispersión de éstos.</p>


        <PcaPaso0/>
        <br></br><br></br>
        <PcaPaso1/>
        <br></br><br></br>
        <PcaPaso2/>
      
      </main>

    </div>
    </>
  );
}

export { PcaPage }

import React from "react";

import { PcaPaso0 } from "./Components/PcaPaso0";
import { PcaPaso1 } from "./Components/PcaPaso1";
import { PcaPaso2 } from "./Components/PcaPaso2";
import { PcaPaso3y4 } from "./Components/PcaPaso3y4";
import { PcaPaso5} from "./Components/PcaPaso5";

function PcaPage() {

  return (
    <>
    <div className="page p-4">
      
      <main>
      
        <h2 className="display-4 mb-4">Análisis de Componentes Principales</h2>
        
        <hr></hr>
        <br></br>
        <p>El análisis de componentes principales (ACP o PCA, Principal Component Analysis) es un algoritmo para reducir la cantidad de variables de conjuntos de datos, mientras se conserva la mayor cantidad de información posible.</p>


        <PcaPaso0/>
        <br></br><br></br>
        <PcaPaso1/>
        <br></br><br></br>
        <PcaPaso2/>
        <br></br><br></br>
        <PcaPaso3y4/>
        <br></br><br></br>

      </main>

    </div>
    </>
  );
}

export { PcaPage }

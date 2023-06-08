
import React from "react";
import Table from "react-bootstrap/esm/Table";


function BosquesPaso3({varAnalizar, displayTable, variables}) {

  
  let predictoras = []
   

  //Del total de variables, quitar la variable que el usuario ingreso para analizar
  function formatData(params) {
    predictoras = variables.filter(function(elemento) {
      return elemento !== varAnalizar;
    });
  }

  formatData();

  return (
    <>
        <h3>Paso 3: Definición de las variables predictoras y variable clase</h3>

        {!displayTable && (
          <p>Ingresa el nombre de la variable a analizar en el paso 1.</p>

        )}
        {displayTable && (
          <>
            <br></br>
            <h4>Variable clase</h4>
            <p>La variable que has ingresado para analizar es: <b> {varAnalizar} </b> </p>

            <br></br>
            <h4>Variables predictoras</h4>
            <br></br>
            <div className="table-responsive" style={{width: "100%"}}>
              <Table className="table table-striped-columns">
                <thead className="table-light">
                  <tr>
                    {predictoras.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                    
                  </tr>
                </thead>      
              </Table>
            </div> 
          </>
        )}
        

    </>
  );
}

export {BosquesPaso3};
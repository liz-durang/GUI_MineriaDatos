
import React from "react";
import { instance } from "../../../Axios";
import { useState, useEffect } from "react";
import '../../../index.css';

function PcaPaso7({diccDatos, displayTable}) {

  const [dataBefore, setDataBefore] = useState([]);
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    setDataBefore(diccDatos);
    console.log(dataBefore);

    instance.get('/pca/variables')
    .then(function (response) {
      setVariables(response.data.variables)
      console.log(variables);
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
  }, []);



  return (
    <>
        <h3>Paso 7. Se eliminan las variables necesarias de acuerdo a PCA</h3>
        <br></br>

        <h4>Atributos antes de PCA</h4>

        
        <table className="table table-striped-columns">
            <thead className="table-light">
              <tr>
                {diccDatos.map((head, index) => (
                  <td scope="col" key={index}> 
                  {head} 
                  </td>
                ))}
              </tr>
            </thead>
          </table>
          

        <br></br>
        <h4>Atributos después de PCA</h4>

        {displayTable && (
        <table className="table table-striped-columns">
            <thead className="table-light"> 
              <tr>
                  {variables.map((variable, index) => (
                    <td scope="col" key={index}>
                      {variable}
                    </td>
                  ))}
          
              </tr>
            </thead>
          </table>
        )} 
    </>
  );
}

export { PcaPaso7 };
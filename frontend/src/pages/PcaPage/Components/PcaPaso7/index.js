
import React from "react";
import { instance } from "../../../Axios";
import { useState, useEffect } from "react";
import '../index.css';

function PcaPaso7({diccDatos}) {

  const [dataBefore, setDataBefore] = useState([]);
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    setDataBefore(diccDatos);
    console.log(dataBefore);

    instance.get('/pca/variables')
    .then(function (response) {
      setVariables(response)
      console.log(variables.charge);
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
                {dataBefore.map((head, index) => (
                  <th scope="col" key={index}> 
                  {head} 
                  </th>
                ))}
              </tr>
            </thead>
          </table>

        <h4>Atributos después de PCA</h4>

        <table className="table table-striped-columns">
            <thead className="table-light"> 
              <tr>
                  <th scope="col" > 
                  
                    {variables.Pregnancies}
                  </th>
          
              </tr>
            </thead>
          </table>
        
    </>
  );
}

export { PcaPaso7 };
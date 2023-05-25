
import React from "react";
import { instance } from "../../../Axios";
import { useState, useEffect } from "react";
import '../index.css';

function PcaPaso7({diccDatos}) {


  const [variables, setVariables] = useState([]);
  console.log(diccDatos);
  console.log(variables);

  useEffect(() => {{
    instance.get('/pca/variables')
    .then(function (response) {
      setVariables(response.data)
      console.log(variables);
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
  }}, [])



  return (
    <>
        <h3>Paso 7. Se eliminar las variables necesarias de acuerdo a PCA</h3>
        <br></br>


        <br></br>



    </>
  );
}

export { PcaPaso7 };
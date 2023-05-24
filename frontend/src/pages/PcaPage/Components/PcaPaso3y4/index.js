
import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";

import '../index.css';

function PcaPaso3y4() {

  const [components, setComponents] = useState();
  const [variance, setVariance] = useState();

  let diccDatos = [];
  let dataStandarize = [];
  
  

  useEffect(() => {
      instance.get('/pca/variance')
      .then(function (response) {
        // manejar respuesta exitosa
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      });
      
    }, [])

    formatData(); 


    //Convertir el arreglo de objetos a un arreglo de arreglos
    function formatData() {
      if (variance !== undefined) {
        
      }
    }


  return (
    <>
        <h3>Pasos 3 y 4: Se calcula la matriz de covarianzas o correlaciones, y se calculan los componentes (eigen-vectores) y la varianza (eigen-valores).</h3>
        <br></br>

       

        <div className="esquema">
          
        </div> 
        
        

    </>
  );
}

export { PcaPaso3y4 };

import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import { TdCell } from "../../../PcaPage/Components/TdCell";


function ArbolesPaso2() {

  const [data, setData] = useState([]);
  let subarreglosCombinados = [];
  const [nameVars, setNameVars] = useState([]);
  
  useEffect(() => {
    instance.get('/trees/correlation')
    .then(function (response) {
      // manejar respuesta exitosa
      setData(response.data.triangle);
      setNameVars(Object.keys(response.data.correlation[0]));
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
    
  }, [])


  
  //hacer subarreglos por cada indice de los arreglos dentro del arreglo
  function formatData() {
    
    subarreglosCombinados = data.reduce(function(resultado, arreglo) {
      arreglo.forEach(function(elemento, indice) {
        if (!resultado[indice]) {
          resultado[indice] = [];
        }
        resultado[indice].push(elemento);
      });
      return resultado;
    }, []);

    //insertar nombre de las variables al inicio de cada fila de datos
    let count = 0;
    subarreglosCombinados.forEach((item) => {
      item.unshift(nameVars[count])
      count = count + 1;
    })
  }

  formatData();

  return (
    <>
        <h3>Paso 2: Selección de características</h3>
        <p>
        A través de un mapa de calor de identifican posibles variables correlacionadas.
        </p>

        <div className="table-responsive" style={{width: "100%", height: "auto"}}>
          <table className="table ">
            <tbody>
              {subarreglosCombinados.map((item, index) => (
                <tr key={index}>
                  {item.map((it, index) => (
                     <TdCell
                        key={index}
                        value={it} 
                      />
                  ))}
                </tr>
              ))}  
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                {nameVars.map((head, index) => (
                  <th scope="col" key={index}> {head} </th>
                ))}
              </tr>
            </tfoot>
          </table>
        </div> 
         
        <br></br>

    </>
  );
}

export {ArbolesPaso2};
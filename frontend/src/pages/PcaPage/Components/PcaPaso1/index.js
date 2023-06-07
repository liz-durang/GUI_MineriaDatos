
import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import { TdCell } from "../TdCell";

function PcaPaso1() {

  const [correlation, setCorrelation] = useState([]);
  const [matrix, setMatrix] = useState([]);

  let diccDatos = [];
  let dataCorrelation = [];
  let dataMatrix = []
  
  

  useEffect(() => {
      instance.get('/pca/correlation')
      .then(function (response) {
        // manejar respuesta exitosa
        setCorrelation(response.data.correlation);

        setMatrix(response.data.matrix);
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
      if (correlation !== undefined) {

        //Obtener diccionario de datos
        correlation.map(dat => (
          diccDatos.push(Object.keys(dat))
        )); 
        
        diccDatos = diccDatos.slice(1,2);  

        let arr = [];
        if (diccDatos[0] !== undefined) {
          diccDatos[0].map(dat => ( 
            arr.push(dat)
          ))

          diccDatos = arr; 
          
        }

        //Obtener valores de los registros. 
        correlation.map(dat => ( 
          dataCorrelation.push(Object.values(dat))
        ));

        matrix.map(dat=> (
          dataMatrix.push(Object.values(dat))
         
        ))

        //Agregarle un valor del dicc de datos a cada registro. 
        let lengthDicc = diccDatos.length;
        let aux1 = 0;
        
        while (aux1 < lengthDicc) {
          dataCorrelation[aux1].unshift(diccDatos[aux1])
          aux1 = aux1 + 1;
          
        }

        let aux2 = 0;
        while (aux2 < lengthDicc) {
          dataMatrix[aux2].push(diccDatos[aux2])
          aux2 = aux2 + 1;
          
        }
        
      }
    }


  return (
    <>
        <h3>Paso 1: Hay evidencia de variables posiblemente correlacionadas</h3>
        <br></br>

        <div className="table-responsive" style={{width: "100%", height: "55vh"}}>
          <table className="table table-striped-columns">
            <thead className="table-light">
              <tr>
                <th scope="col"> {''} </th>
                {diccDatos.map((head,index) => (
                  <th scope="col" key={index}> {head} </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {dataCorrelation.map((item,index) => (
                <tr key={index}>
                  {item.map((it, index) => (
                     <td key={index}>
                      {it}
                    </td>
                  ))}
                </tr>
              ))}  
            </tbody>
          </table>
        </div> 
        
        <br></br>         
        <h4>Mapa de calor de correlaciones</h4>
        <br></br> 

        <div className="table-responsive" style={{width: "100%", height: "auto"}}>
          <table className="table ">
            <tbody>
              {dataMatrix.reverse().map((item, index) => (
                <tr key={index} >
                  {item.reverse().map((it, index) => (
                    
                     <TdCell
                        key={index}
                        value={it}
                        style={{color: "white"}}
                      />

                  ))}
                </tr>
              ))}  
            </tbody>
            <tfoot>
              <tr>
                  <th scope="col"> {''} </th>
                  {diccDatos.reverse().map((head, index) => (
                    <th scope="col" key={index}> {head} </th>
                  ))}
              </tr>
            </tfoot>
          </table>
        </div> 

    </>
  );
}

export { PcaPaso1 };
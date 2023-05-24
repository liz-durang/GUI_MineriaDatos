
import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import '../index.css';


function PcaPaso0() {

  const [data0, setData0] = useState([]);
  let dataToArreglo = [];
  let diccDatos = [];
  let chartData = [];

  useEffect(() => {
      instance.get('/pca')
      .then(function (response) {
        // manejar respuesta exitosa
        setData0(response.data);
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
      
      if (data0 != undefined) {

        //Obtener diccionario de datos
        data0.map(dat => (
          diccDatos.push(Object.keys(dat))
        )); 
        
        diccDatos = diccDatos.slice(1,2);  

        let arr = [];
        if (diccDatos[0] != undefined) {
          diccDatos[0].map(dat => ( 
            arr.push(dat)
          ))

          diccDatos = arr; 
        }
        

        //Obtener valores de los registros 
        data0.map(dat => ( 
          dataToArreglo.push(Object.values(dat))
        ));


      }
      
    }


  return (
    <>
        <h3>Paso 0: Importar datos</h3>
        <br></br>

        <div className="esquema">
          <table className="table table-striped-columns">
            <thead className="table-light">
              <tr>
                {diccDatos.map(head => (
                  <th scope="col" id={diccDatos.indexOf(head)}> {head} </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataToArreglo.map(item => (
                <tr id={dataToArreglo.indexOf(item)}>
                  {item.map(it => (
                     <td id={item.indexOf(it)}>
                      {it}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>       
          </table>
        </div> 

    </>
  );
}

export {PcaPaso0};
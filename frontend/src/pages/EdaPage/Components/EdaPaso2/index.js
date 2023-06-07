import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import { EdaPaso3 } from "../EdaPaso3";
import Table from 'react-bootstrap/Table';


function EdaPaso2() {


    const [dataNull, setDataNull] = useState([]);
    let dataValues = [];

    useEffect(() => {
        instance.get('/eda/null_var')
        .then(function (response) {
          // manejar respuesta exitosa
          setDataNull(response.data.null_variables);
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

    function formatData() {

      if (dataNull !== undefined) {
           dataValues.shift();
          //Convertir el objeto a un arreglo
          for (let llave in dataNull) {
            let aux = []
            aux.push(llave)
            aux.push(dataNull[llave]);
            dataValues.push(aux);
          }
        }
        
      }
    

    return(

        <>
        <h3>Paso 2: Identificación de datos faltantes</h3>
        
        <p> Se hace identificación de variables con el número de datos nulos que contienen.</p>

        {JSON.stringify(dataNull).length > 2 && (
          <div className="table-responsive" style={{width: "100%", height: "50vh"}}>
            <Table bordered style={{width: "450px", margin: "auto"}} className="">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Datos nulos</th>
                </tr>
              </thead>
              <tbody>
                  {dataValues.map((it, index1) => (
                    <tr key={index1}>
                        <td>{it[0]} </td>
                        <td>{it[1]} </td>
                    </tr>
                  ))}
              </tbody>
          </Table>
        </div>
      )}

      {!(JSON.stringify(dataNull).length > 2) &&(
        <p className="text-center"> <b>Estos datos no contienen valores nulos</b></p>
      )}

      <EdaPaso3
        dataValues = {dataValues}
      /> 

        </>
    );
    
}

export { EdaPaso2 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 


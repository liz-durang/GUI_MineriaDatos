import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import Table from 'react-bootstrap/Table';
import '../../../index.css';

function EdaPaso2() {


    const [dataNull, setDataNull] = useState([]);
    const [dataValues, setDataValues] = useState([]);

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
        
        formatData();
    }, [])

    function formatData() {
      if (dataNull !== undefined) {
        dataValues.shift();
        //Convertir el objeto a un arreglo
        for (let llave in dataNull) {
          let aux = []
          aux.push(llave)
          aux.push(dataNull[llave]);
          setDataValues(dataValues.push(aux));
        }
        let aux = [];
        aux.push(dataValues);
        setDataValues(aux);
        console.log(dataValues);
      }
    }

    return(

        <>
        <h3>Paso 2: Identificación de datos faltantes</h3>
        <br></br>
        <p> Se hace identificación de variables con el número de datos nulos que contienen</p>

        <Table bordered style={{width: "450px", margin: "auto"}} className="esquema">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Datos nulos</th>
            </tr>
          </thead>
          {dataValues.map((item, index) => (
          <tbody>
              {item.map((it, index) => (
                <tr id={index}>
                     <td id={index}>{it[0]} </td>
                     <td id={index}>{it[1]}</td>
                </tr>
              ))}
          </tbody>
          ))}  
      </Table>
        </>
    );
    
}

export { EdaPaso2 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 

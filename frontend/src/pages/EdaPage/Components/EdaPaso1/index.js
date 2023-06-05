import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import Table from 'react-bootstrap/Table';

function EdaPaso1() {

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        instance.get('/eda')
        .then(function (response) {
          // manejar respuesta exitosa
          setRows(response.data.rows);
          setColumns(response.data.columns);
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        });
        
    }, [])

    return(

        <>
        <h3>Paso 1: Descripción de la estructura de los datos </h3>
        <br></br>
        

        <Table bordered style={{width: "300px", margin: "auto"}}>
        <thead>
        <tr>
            <th colSpan={2} className="text-center">Estructura del dataset</th>
          </tr>
          <tr>
            <th>Filas</th>
            <th>Columnas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{rows}</td>
            <td>{columns}</td>
          </tr>
        </tbody>
        </Table>




        </>
    );
    
}

export { EdaPaso1}
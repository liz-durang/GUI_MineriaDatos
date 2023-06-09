
import React from "react";
import Table from "react-bootstrap/esm/Table";
import { ClusterPaso11 } from "../ClusterPaso11";
//import { BosquesPaso11 } from "../../../ForestPage/Components/BosquesPaso11";


function ClusterPaso1({rows, columns}) {
  

  return (
    <>
        <h3>Paso 1: Descripción de los datos</h3>
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
         
        <br></br>
        <ClusterPaso11/>
    </>
  );
}

export {ClusterPaso1};
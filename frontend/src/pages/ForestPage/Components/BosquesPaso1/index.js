
import React from "react";
import Table from "react-bootstrap/esm/Table";
import { BosquesPaso11 } from "../BosquesPaso11";


function BosquesPaso1({rows, columns}) {
  

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
        <BosquesPaso11/>
    </>
  );
}

export {BosquesPaso1};
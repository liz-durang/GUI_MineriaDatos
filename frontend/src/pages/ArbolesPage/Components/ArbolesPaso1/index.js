
import React from "react";
import { ArbolesPaso11 } from "../ArbolesPaso11";
import Table from "react-bootstrap/esm/Table";


function ArbolesPaso1({rows, columns}) {
  

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
        <ArbolesPaso11/>
    </>
  );
}

export {ArbolesPaso1};
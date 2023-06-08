
import React from "react";
import { instance } from "../../../Axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { ArbolesPaso5 } from "../ArbolesPaso5";
import { ArbolesPaso6 } from "../ArbolesPaso6";


function ArbolesPaso4({varAnalizar, displayTable}) {

  const [pronostico, setPronostico] = useState([]);
  const [accuracy, setAccuracy] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [displayPronostico, setDisplayPronostico] = useState(false);

  function getData() {
    let url = `/trees/decision-tree?variable=${varAnalizar}`
    instance.get(url)
    .then(function (response) {
      setPronostico(response.data.mod_values)
      setAccuracy(response.data.accuracy)
      setMatrix(response.data.matrix)
      setDisplayPronostico(true);
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });

    
  }
  

    //Acciones del formulario
    const {handleSubmit} = useForm();
    const onSubmit = () =>{
      getData();
      
    }

    
  return (
    <>
        <h3>Paso 4: Creación del modelo</h3>

        {!displayTable && (
          <p>Ingresa el nombre de la variable a analizar en el paso 1.</p>

        )}
        {(displayTable && !displayPronostico) &&  (
        <>
          {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-auto me-1">
                <Button 
                    className="mt-1"
                    type="submit" 
                    value="Enviar" 
                    style={{backgroundColor: "#3f20ba"}}    
                >
                    Crear modelo
                </Button>
            </div>
        </form>
        </>

        )}

        {displayPronostico && (
        <>
         {/* Clasificación Final */}
         <br></br>
          <h4>Se genera el pronóstico de la clasificación final</h4>
          <div className="table-responsive mt-4" style={{width: "95%", height: "40vh"}}>
          <Table className="table table-striped-columns" style={{width: "400px", margin: "auto"}}>
              <thead className="table-light">
                <tr>
                  <th scope="col">Y Validación</th>
                  <th scope="col"> Y Clasificación</th>
                </tr>
                
              </thead>
              
              <tbody>
              {Object.entries(pronostico).map(([clave, valor]) => (
                <tr key={clave}>
                  <td>{clave}</td>
                  <td>{valor[0]}</td>
                </tr>
              ))}
              </tbody>       
            </Table>
          </div>
        {/* Score del pronóstico */}
        <br></br>
        <p>El score del pronóstico es: <b>{accuracy}</b></p>
       
        {/* Matriz de Clasificación */}  
        <br></br>
        <h4>Matriz de clasificación: Árbol de decisión</h4>
        <br></br>
        <Table className="table table-striped-columns" style={{width: "400px", margin: "auto"}}>
              <thead className="table-light">
                <tr>
                  <td></td>
                  {Object.entries(matrix).map(([clave, valor]) => (
                    <td key={clave}>{clave}</td>
                  ))}
                  </tr>
              </thead>
              
              <tbody>
              {Object.entries(matrix).map(([clave, valor]) => (
                <tr key={clave}>
                  <td>{clave}</td>
                  <td>{valor[0]}</td>
                  <td>{valor[1]}</td>
                </tr>
              ))}
              </tbody>       
        </Table>
        
        
        </>

        )}

      <br></br>
      <ArbolesPaso5
        varAnalizar = {varAnalizar}
        displayPronostico = {displayPronostico}
      />
      <br></br>
      <ArbolesPaso6
        varAnalizar = {varAnalizar}
        displayPronostico = {displayPronostico}
      />
    </>
  );
}

export {ArbolesPaso4};
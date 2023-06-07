
import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";

function ArbolesPaso5({varAnalizar, displayPronostico}) {

  const [criterio, setCriterio] = useState([]);
  const [exactitud, setExactitud] = useState([]);
  const [clasificationReport, setClasificationReport] = useState([]);
  const [headerDescription, setHeaderDescription] = useState([]);
  const [headerImportancia, setHeaderImportancia] = useState([]);
  const [importancia, setImportancia] = useState([]);
  const [displayReporte, setDisplayReporte] = useState(false);

  function getData() {
    let url = `/trees/classification-report?variable=${varAnalizar}`
    instance.get(url)
    .then(function (response) {
      setCriterio(response.data.report.Criterio)
      setExactitud(response.data.report.Exactitud)
      setClasificationReport(response.data.report.ReporteClasificación)
      setImportancia(response.data.importance)
      
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
    formatDescription() 
  }

  //Dar formato al reporte de clasificacions
  function formatDescription() {
    

    //Guardar nombre de las estadisticas de las variables para reporte
    let header1 = []
    Object.entries(clasificationReport).map(([clave,valor]) => {
      header1 = Object.keys(valor)
    })
    setHeaderDescription(header1);
    
    //Guardar nombre de las estadisticas de las variables para importancia
    let header2 = []
    Object.entries(importancia).map(([clave,valor]) => {
      header2 = Object.keys(valor)
    })
    setHeaderImportancia(header2);
    
    //Cuando los datos se llenen, que se muestren las gráficas
    if (header2.length > 0) {
      setDisplayReporte(true) 
    }


  }
  
  //Acciones del formulario
  const {handleSubmit} = useForm();
  const onSubmit = () =>{
    getData();
  }
    
  return (
    <>
       <h3>Paso 5: Reporte de clasificación</h3>

        {!displayPronostico && (
          <p>Crea el modelo en el paso 4 para poder ver su reporte.</p>

        )}

        {(displayPronostico && !displayReporte) && (
        <>
          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-auto me-1 mt-3">
              <label>Consulta con doble clic</label>
              <br></br>
                <Button 
                    className="mt-1"
                    type="submit" 
                    value="Enviar" 
                    style={{backgroundColor: "#3f20ba"}}    
                >
                    Crear reporte
                </Button>
            </div>
          </form>
        </>
        )}

        {displayReporte && (
        <>
        {/* Criterio e Importancia de Variables */}
        <br></br>
        <Table className="table table-striped-columns text-center" style={{width: "400px", margin: "auto"}}>
          <thead className="table-light">
            <tr>
              <th scope="col">Criterio</th>
              <th scope="col">Exactitud</th>
            </tr>
          </thead>
          <tbody>
            <td>{criterio}</td>
            <td>{exactitud}</td>
          </tbody>       
        </Table>

        {/* Reporte de Clasificación*/}
        <br></br><br></br>
        <h4>Reporte de Clasificación</h4>
        <div className="table-responsive" style={{width: "100%"}}>
          <Table className="table table-striped-columns">
            <thead className="table-light">
              <tr>
                <th></th>
                {headerDescription.map((head, index) => (
                  <th scope="col" key={index}> {head} </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {
              Object.entries(clasificationReport).map(([clave,valor]) => (
                <tr key={clave}>
                  <td>{clave}</td>
                  {headerDescription.map((item, key) => (
                  <td key={key}>{valor[item]}</td>
                  ))}     
                </tr>
              ))
             }
            </tbody>       
          </Table>
        </div>

        {/* Importancia de cada variable*/}
        <br></br><br></br>
        <h4>Importancia de cada variable</h4>
        <div className="table-responsive" style={{width: "100%"}}>
          <Table className="table table-striped-columns">
            <thead className="table-light">
              <tr>
                <th></th>
                {headerImportancia.map((head, index) => (
                  <th scope="col" key={index}> {head} </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {
              Object.entries(importancia).map(([clave,valor]) => (
                <tr key={clave}>
                  <td>{clave}</td>
                  {headerImportancia.map((item, key) => (
                  <td key={key}>{valor[item]}</td>
                  ))}     
                </tr>
              ))
             }
            </tbody>       
          </Table>
        </div>
        </>
        )}
    </>
  );
}

export {ArbolesPaso5};
import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";

function ClusterPaso23({displayModel}) {

    const [labels, setLabels] = useState([]);
    const [elements, setElements] = useState([]);
    const [header,setHeader] = useState([]);

    useEffect(() => {
        instance.get('cluster/create-labels')
        .then(function (response) {
          // manejar respuesta exitosa
          setLabels(response.data.labels);
          setElements(response.data.elementos);
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        });


      formatDescription ()
      }, [displayModel])

    console.log(labels)
    
  //Dar formato a datos para imprimir
  function formatDescription() {

    //Guardar nombre de las estadisticas de las variables para reporte
    let header1 = []
    Object.entries(labels).map(([clave,valor]) => {
      header1 = Object.keys(valor)
    })
    setHeader(header1);


  }
    
    return(
        <>
          {displayModel && (

            <>
            <br></br><br></br>
            <h5>3) Se crean las etiquetas de los elementos en los clusters</h5>
            <br></br>
            
            {/* Etiquetas*/}
            <div className="table-responsive" style={{width: "100%", height: "45vh"}}>
            <Table className="table table-striped-columns">
                <thead className="table-light">
                  <tr>
                  <th></th>
                  {header.map((head, index) => (
                    <th scope="col" key={index}> {head} </th>
                  ))}
                </tr>
                </thead>
                <tbody>
                  {
                  Object.entries(labels).map(([clave,valor]) => (
                      <tr key={clave}>
                      <td>{clave}</td>
                      {header.map((item, key) => (
                      <td key={key}>{valor[item]}</td>
                      ))}     
                      </tr>
                  ))
                  }
                </tbody>     
            </Table>
            </div>    

            <br></br><br></br>
            <h5>4) Cantidad de elementos en los clusters</h5>
            <br></br>
            <div className="table-responsive" style={{width: "50%", height: "auto", margin: "auto"}}>
              <Table className="table table-striped-columns">
                <thead>
                <tr>
                    <th>Cluster</th>
                    <th>Elementos</th>
                  </tr>
                </thead>
                <tbody>
                  {elements.map((item, key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            {/* Etiquetas*/}
          </>
        )}  
      </>
    );

}

export {ClusterPaso23};
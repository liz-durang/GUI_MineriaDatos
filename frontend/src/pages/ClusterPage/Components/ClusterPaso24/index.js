import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

function ClusterPaso24({displayModel}) {

    const [inspected, setInspected] = useState([]);
    const [centroides, setCentroides] = useState([]);
    const [header,setHeader] = useState([]);
    const [variable,setVariable] = useState([]);
    const [displayInspected, setDisplayInspected] = useState(false);
    const baseURL = '/cluster/inspect-cluster?variable='

    function getData (url) {
      instance.get(url)
      .then(function (response) {
        
        setInspected(response.data.inspected)
        setCentroides(response.data.centroidesP)
        //Dar formato a size de la var a analizar
        
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      });
      
      formatDescription();
      
     }
    
  //Dar formato a datos para imprimir
  function formatDescription() {

    //Guardar nombre de las estadisticas de las variables para reporte
    let header1 = []
    Object.entries(inspected).map(([clave,valor]) => {
      header1 = Object.keys(valor)
    })
    setHeader(header1);
    setDisplayInspected(true);

  }

   //Acciones del formulario
   const {register, handleSubmit} = useForm();
   const onSubmit = (data) =>{
     let url = baseURL + data.variable;
     console.log(url);
     getData(url);
     setVariable(data.variable);
     
   }
    
    return(
        <>
          {displayModel && (

            <>
            <br></br><br></br>
            <h5>4) Seleccionar un número de cluster para inspeccionar</h5>

              {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="col-auto me-1 mt-3">
                    <input
                        className="form-control mt-1"
                        type="text"
                        placeholder="2"
                        {...register('variable', {
                            required: true
                        })}
                    />
                </div>
                <div className="col-auto me-1 mt-3">
                    <Button 
                        className="mt-1"
                        type="submit" 
                        value="Enviar" 
                        style={{backgroundColor: "#3f20ba"}}    
                    >
                        Consultar
                    </Button>
                </div>
            </form>

            <br></br><br></br>
            {displayInspected && (
            <>
            {/* Inspeccionar*/}
            <p> Cluster No. {variable}</p>
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
                  Object.entries(inspected).map(([clave,valor]) => (
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
            {/* Centroides*/}
            <p> Centroides del Cluster No. {variable}</p>
            <div className="table-responsive" style={{width: "100%", height: "auto"}}>
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
                  Object.entries(centroides).map(([clave,valor]) => (
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
            </>
            )}
          </>
        )}  
      </>
    );

}

export {ClusterPaso24};
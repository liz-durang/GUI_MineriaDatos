
import React from "react";
import { instance } from "../../../Axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArbolesPaso2 } from "../ArbolesPaso2";
import { ArbolesPaso3 } from "../ArbolesPaso3";
import { ArbolesPaso4 } from "../ArbolesPaso4";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";

function ArbolesPaso11() {
  
  const baseURL = '/trees/analysis?variable='
  const [description, setDescription] = useState([]);
  const [headerDescription, setHeaderDescription] = useState([]);
  const [size, setSize] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [varAnalizar, setVarAnalizar] = useState('');
  const [variables, setVariables] = useState([]);

  //obtener la consulta dado la variable  del usuario ingresado
  function getData (url) {
    instance.get(url)
    .then(function (response) {
      
      setSize(response.data.data_sizes)
      setDescription(response.data.description)
      //Dar formato a size de la var a analizar
      
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
    
    formatSize();
    
   }


  //Dar formato a size de la variable
   function formatSize() {
    setEntradas(Object.entries(size))

    formatDescription();
   }

  //Dar formato a la descripción de la variable
  function formatDescription() {
    //Guardar nombre de las estadisticas de las variables
    let header = []
    Object.entries(description).map(([clave,valor]) => {
      header = Object.keys(valor)
    })

    setHeaderDescription(header);
    setDisplayTable(true);
    //Extraer nombre de las variables
    setVariables(Object.keys(description))
  }



  //Acciones del formulario
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) =>{
    let url = baseURL + data.variable;
    console.log(url);
    getData(url);
    
    //guardar variable a analizar
    setVarAnalizar(data.variable);
  }


  return (
    <>
        <p>Ingresa el nombre de la variable que se va a analizar y consulta con doble clic</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-auto me-1 mt-3">
                <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Outcome"
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
        {displayTable && (
        <> 
          {/* Valores de la variable */}
          <Table bordered style={{width: "300px", margin: "auto"}}>
            <thead>
            <tr>
                <th colSpan={2} className="text-center">Variable a agrupar</th>
              </tr>
              <tr>
                <th>Valores</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((item, key) => (
                <tr key={key}>
                  {item.map((it, llave) => (
                    <td key={llave}>{it}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Descripcion de la variable */}
          <br></br>
          <p>Descripción de la variable</p>
          <div className="table-responsive" style={{width: "100%", height: "52vh"}}>
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
                  Object.entries(description).map(([clave,valor]) => (
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
        </>

        )}
        
      <br></br>
      <ArbolesPaso2/>
      <br></br>
      <ArbolesPaso3
        varAnalizar = {varAnalizar}
        displayTable = {displayTable}
        variables = {variables}
      />
      <br></br>
      <ArbolesPaso4
        varAnalizar = {varAnalizar}
        displayTable = {displayTable}
      />      
      <br></br>

    </>
  );
}

export {ArbolesPaso11};
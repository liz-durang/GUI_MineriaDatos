
import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import '../../../../pages/index.css';
import Table from "react-bootstrap/esm/Table";


function ArbolesPaso11() {
  
  const baseURL = '/trees/analysis?variable='
  const [description, setDescription] = useState([]);
  const [size, setSize] = useState([]);
  const [entradas, setEntradas] = useState([]);

  //obtener la consulta dado la variable  del usuario ingresado
  function getData (url) {
    instance.get(url)
    .then(function (response) {
      //console.log(response.data.statistics)
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

  // console.log(size)
  // console.log(description)

  //Dar formato a size de la variable
   function formatSize() {
    setEntradas(Object.entries(size))
   }
  console.log(entradas)


  //Acciones del formulario
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) =>{
    let url = baseURL + data.variable;
    console.log(url);
    getData(url);
    
  }

  return (
    <>
        <p>Ingresa el nombre de la variable que se va a agrupar</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-auto me-1">
                <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Outcome"
                    {...register('variable', {
                        required: true
                    })}
                />
            </div>
            <div className="col-auto me-1">
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
    </>
  );
}

export {ArbolesPaso11};
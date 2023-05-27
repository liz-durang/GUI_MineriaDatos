import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import Table from 'react-bootstrap/Table';
import '../../../index.css';
import { all } from "axios";

function EdaPaso3() {

    let baseURL1 = '/eda/var_description?variable='
    let baseURL2 = '&param=0'
    
    const [variables, setVariables] = useState([]);
    const [description, setDescription] = useState([]);
    let diccDatos = [];
    let diccDescription = [];
    let allDescriptions = [];
    let urls = [];

    useEffect(() => {
        
      getVariables();
      getDescription();
        
    }, [])

    formatVariables();
    formatDescriptions();
    getURL();

    function getVariables() {
      //leer variables y guardarlas en un arreglo
      instance.get('/eda')
      .then(function (response) {
        // manejar respuesta exitosa
        setVariables(response.data.data);
        
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        // siempre sera executado
      });
    }
    

    function getDescription() {

      //leer descripciones de cada variable y guardarlas en un arreglo
      urls.map((item) => (
        instance.get(item)
        .then(function (response) {
          // manejar respuesta exitosa
          setDescription((prevArray) => [...prevArray, [response.data.description]]);
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        })
      ))
      
    }

    function formatVariables() {
      //Obtener diccionario de datos
      variables.map((dat) => (
        diccDatos.push(Object.keys(dat))
      )); 
      
      diccDatos = diccDatos.slice(1,2);  

      let arr = [];
      if (diccDatos[0] != undefined) {
        diccDatos[0].map(dat => ( 
          arr.push(dat)
        ))

        diccDatos = arr; 
      
      }
      diccDatos.unshift('');
      console.log(diccDatos)
      //Obtener el endpoint de cada variable
      
      console.log(urls);
    }

    function formatDescriptions() {

      //Obtener nombre de las descripciones 
      description.map((desc) => (
        desc.forEach(element => {
          let aux = []
          for (let llave in element) {
            aux.push(llave)
          }
          diccDescription.push(aux);
        }
      )))
      diccDescription = diccDescription.slice(1,2); 

      let arr = [];
        if (diccDescription[0] != undefined) {
          diccDescription[0].map(dat => (
            arr.push(dat)
          ))

          diccDescription = arr; 
        }

      allDescriptions.push(diccDescription);

      //Obtener valores de datos de un objeto
      description.map((desc) => (
        desc.forEach(element => {
          let aux = []
          for (let llave in element) {
            aux.push(element[llave])
          }
          allDescriptions.push(aux);
        }
      )))

      //
    }

    function joinDatos() {
       //Agregarle un valor del dicc de datos a cada registro. 
       if (diccDatos !== undefined) {
        let lengthDicc = diccDatos.length;
        let aux1 = 0;
        
        while (aux1 < lengthDicc) {
          console.log(diccDatos[aux1]);
          
        }
       }
        
    }
    console.log(allDescriptions)

    function getURL() {
      diccDatos.forEach(element => {
        let url = baseURL1 + element + baseURL2;
        urls.push(url);
      });
    }

    
    

    return(

        <>
        <h3>Paso 3: Detección de valores atípicos</h3>
        <br></br>
        <h4> 1) Distribución de variables numéricas</h4>


        <h4> 2) Resumen estadístico de variables numéricas</h4>
        <div className="esquema">
          <Table bordered style={{width: "450px", margin: "auto"}} className="table table-striped-columns">
            <thead>
              <tr>

              </tr>
            </thead>
            <tbody>
              {allDescriptions.map((item, index) => (
                <tr id={index}>
                  {item.map((it, index) => (
                     <td id={index}>
                      {it}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody> 
         </Table>
        </div>
        </>
    );
    
}

export { EdaPaso3 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 

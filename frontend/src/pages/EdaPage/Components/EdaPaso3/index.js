import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import Table from 'react-bootstrap/Table';
import '../../../index.css';
function EdaPaso3() {

    const baseURL1 = '/eda/var_description?variable='
    const baseURL2 = '&param=0'
    
    const [variables, setVariables] = useState([]);
    const [urls, setUrls] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [nameDescriptions, setNameDesriptions] = useState([]);
    const [diccDatos, setDiccDatos] = useState([]);

    let allDescriptions = [];

    useEffect(() => {
        
      getVariables();
      getURLs();
      getNameDescription();
      getDescription();
        
    }, [])

    function getVariables() {
      
      //leer variables y guardarlas en un arreglo
      instance.get('/eda')
      .then(function (response) {
        // manejar respuesta exitosa
        let aux = response.data.data[0];
        aux = Object.keys(aux);
        setVariables(aux);

        //Si se obtienen los datos, continua con lo demás 
        
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        
      });
      setVariables((prevVar) => [...prevVar, 'h']);
    }
    console.log(variables);

    function getURLs() {
      variables.map((item) => {
        const newURL = baseURL1 + item + baseURL2;
        if (!urls.includes(newURL)) {
          setUrls((prevUrls) => [...prevUrls, newURL]);
        }
      })
      //Si se obtienen los datos, continua con lo demás 
      
    }
    console.log(urls);

    function getDescription() {
      //leer descripciones de cada variable y guardarlas en un arreglo
      urls.map((item) => (
        instance.get(item)
        .then(function (response) {
          // manejar respuesta exitosa
          //Agregar valores descripciones
          let newDescription = Object.values(response.data.description);
          if ((descriptions.length+1) < urls.length) {
            setDescriptions((prevDescription) => [...prevDescription, newDescription]);
          }
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

    function getNameDescription() {
      
      //leer descripciones de cada variable y guardarlas en un arreglo
      if (urls.length > 0) {
        instance.get(urls[0])
        .then(function (response) {
          // manejar respuesta exitosa
          //Agregar valores descripciones
          let newName = Object.keys(response.data.description);
          setNameDesriptions(newName);
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        })
      }
    }

    console.log(descriptions);
    console.log(nameDescriptions);

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
              {nameDescriptions.map((item, index) => (
                <th> {item}  </th>
              ))}
              </tr>
            
            </thead>
            <tbody>{
              descriptions.map((item, index) => (
                <tr>
                  {item.map((it, index) => (
                    <td>{it}</td>
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

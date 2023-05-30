import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../../../Axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../../../../../index.css';
function EdaPaso31() {

    const baseURL1 = '/eda/var_description?variable='
    const baseURL2 = '&param=0'
    
    const [variables, setVariables] = useState([]);
    const [urls, setUrls] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [nameDescriptions, setNameDescriptions] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);

    //let descriptions = [];


    useEffect(() => {
        
    getVariables();
    
    }, []);

    const getVariables = () => {
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
      
    }

    const getURLs = () => {
      variables.map((item) => {
        const newURL = baseURL1 + item + baseURL2;
        if (!urls.includes(newURL)) {
          setUrls((prevUrls) => [...prevUrls, newURL]);
        }
      })
      //Si se obtienen los datos, continua con lo demás 
      
    }

    const getNameDescription = () => {
      
      //leer descripciones de cada variable y guardarlas en un arreglo
      if (urls.length > 0) {
        instance.get(urls[0])
        .then(function (response) {
          // manejar respuesta exitosa
          //Agregar valores descripciones
          let newName = Object.keys(response.data.description);
          newName.unshift('variable');
          setNameDescriptions(newName);
          //Si se obtienen los datos, continua con lo demás 
          
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
          
        })
      }
      //Si se obtienen los datos, continua con lo demás 
      
      
    }

    const getDescription = () => {
      //leer descripciones de cada variable y guardarlas en un arreglo
        
        urls.map((item, index) => (
          instance.get(item)
          .then(function (response) {
            // manejar respuesta exitosa
            //Agregar valores descripciones
            let newDescription = Object.values(response.data.description);
            newDescription.unshift(variables[index]);
            
            setDescriptions((prevDescription) => [...prevDescription, newDescription]);
            setDisplayTable(true);
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

    function startQuery() {
      getURLs(); 
      getNameDescription();
      getDescription();
      
    }

  
    return(

        <>
        

        <h4> 1) Resumen estadístico de variables numéricas</h4>
        <br></br>
        {!displayTable && (
          <Button style={{backgroundColor: "#3f20ba"}} size="lg" onClick={startQuery}>
            Consulta con doble clic
          </Button>
        )}
        <br></br>

        {displayTable && ( <div className="esquema">
          <Table bordered style={{width: "450px", margin: "auto"}} className="table table-striped-columns">
            <thead>
              <tr>

              {nameDescriptions.map((item, index) => (
                <th id={index}> {item}  </th>
              ))}
              </tr>
            
            </thead>
            <tbody>{
              descriptions.map((item, index) => (
                <tr id={index}>
                  {item.map((it, index) => (
                    <td id={index}>{it}</td>
                  ))}
                    
                </tr>
              ))}
                
            </tbody> 
         </Table>
        </div> )}
        </>
    );
    
}

export { EdaPaso31 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 

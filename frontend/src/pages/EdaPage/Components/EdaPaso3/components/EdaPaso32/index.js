import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { instance } from "../../../../../Axios";
import Table from 'react-bootstrap/Table';
import '../../../../../index.css';

function EdaPaso32() {

    const [variables, setVariables] = useState([]);
    const [data, setData] = useState([]);
    const [okData, setOkData] = useState([]);
    const [superOkData, setSuperOkData] = useState([]);
    const [dataChar, setDataChar] = useState([]);

    useEffect(() => {
        
        
        getData();
        

    }, [])
    console.log(data);
    function getData() {
        //leer variables y guardarlas en un arreglo
        instance.get('/eda')
         .then(function (response) {
          //console.log(response.data.data);
          setData(response.data.data);
        
          //Realizar si ya se completo lo anterior
          getVariables(); 
         })
          .catch(function (error) {
            // manejar error
            console.log(error);
          })
          .finally(function () {
            
          });
    }
         
    function getVariables() {
        //leer variables y guardarlas en un arreglo
      instance.get('/eda')
      .then(function (response) {
        // manejar respuesta exitosa
        let aux = response.data.data[0];
        aux = Object.keys(aux);
        setVariables(aux);

        //Si se obtienen los datos, continua con lo demás 
        formatData();
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        
      });
    }
    //console.log(variables)
    

    //Convertir objeto a arreglo
    function formatData() {
        data.map((item, index) => {

            let key = (Object.keys(item)[1] + " | " + data.indexOf(item))
            let value = Object.values(item)[1]
            
            setOkData((prev) => [...prev, [key,value]]);
        })
        setSuperOkData((prev) => [...prev, okData]);

        //Si se obtienen los datos, continua con lo demás
        formatDataChar();
    }  

    console.log(okData);
    

    let options = {
        title: "Histogram",
        legend: { position: "none" },
      };
    

    function formatDataChar() {
        let arrAux = [['Variable', 'count']];
        let arr = [...arrAux, ...okData];
        setDataChar(arr);
    }
    
    console.log(dataChar);
    return(

        <>
            <h4> 2) Distribución de variables numéricas</h4>
            <br></br>
            <div>
             <Chart
                chartType="Histogram"
                width="100%"
                height="400px"
                data={dataChar}
                options={options}
                /> 
            </div>
             
        </>
    );
    
}

export { EdaPaso32 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 

import React from "react";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { instance } from "../../../../../Axios";
import Button from 'react-bootstrap/Button';
import '../../../../../index.css';

function EdaPaso32() {

    const [variables, setVariables] = useState([]);
    const [data, setData] = useState([]);
    const [dataChar, setDataChar] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    const [allDataChar, setAllDataChar] = useState([]);
    
    useEffect(() => {

      getData();
      getVariables(); 

    }, [])
    
    console.log(allDataChar);

    function getData() {
      //leer variables y guardarlas en un arreglo
      instance.get('/eda')
      .then(function (response) {
        setData(response.data.data);
        //Realizar si ya se completo lo anterior
        
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {   
        //Siempre se ejecuta
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
        
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
      })
      .finally(function () {
        
      });
    }

    //Convertir objeto a arreglo
    function formatData() {
      variables.map((item, index) => {
        setDataChar((prev) => [...prev, ['variable', 'count']]);
        data.map((item) => {
          let name = Object.keys(item)[index];
          let key = (Object.keys(item)[index] + " | " + data.indexOf(item))
          let value = Object.values(item)[index]
          
          setDataChar((prev) => [...prev, [key,value]]);
          //setDisplayTable(true);
        });
      }) 
       
      
    }  

    function separarData(){

      if (allDataChar.length < variables.length) {
        let allDataAux = [];
        let dataAux = [];
        for (let index = 0; index < dataChar.length; index++) {
          if (dataChar[index][0] !== 'variable') {
            dataAux.push(dataChar[index]);
          } else{
            allDataAux.push(dataAux);
            dataAux = [];
          }
          
        }
        allDataAux.push(dataAux);
        allDataAux.shift();
        
        //a cada arreglo de datos agregarle su etiqueta
        allDataAux.map((item) => (
          item.unshift(['variable', 'count'])
        ))
        setAllDataChar(allDataAux);
        
      }
      

     
    }

    let options = {
        legend: { position: "none" },
      };
      
    function startQuery() {
      
      formatData();
      separarData();

      if (allDataChar.length > 0) {
        setDisplayTable(true);
      }
    }
    return(

        <>
            <h4> 2) Distribución de variables numéricas</h4>
            <br></br>
             
            {!displayTable && (
            <Button style={{backgroundColor: "#3f20ba"}} size="lg" onClick={startQuery}>
               Consulta con tres clic's
             </Button>
            )}
            

            <br></br>

            {displayTable && (
            <div className="histogramFlex">
              {allDataChar.map((item, index) => (
              <div key={index}>
                  <p className="text-center">{item[1]}</p>
                  <Chart
                  chartType="Histogram"
                  height="400px"
                  width={"350px"}
                  data={item}
                  options={options}
                  /> 
              </div>
              ))}
            </div>
            )}
            
        </>
    );
    
}

export { EdaPaso32 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 


/*

*/
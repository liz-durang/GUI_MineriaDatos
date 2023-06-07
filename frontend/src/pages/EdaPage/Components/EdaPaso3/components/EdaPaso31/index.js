import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../../../Axios";
import { Chart } from "react-google-charts";
import Button from 'react-bootstrap/Button';


//Recibe datos que tienen nulls
function EdaPaso31({dataValues}) {

    const [datValues, setDatValues] = useState([]);
    const [data, setData] = useState([]);
    const [dataChar, setDataChar] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    
    useEffect(() => {

      getData();
      
    }, [])

    //Los datos que tienen nulls ahora hay que separarlos para solo dejar la variable
    function getDatValues() {
      dataValues.map((item, key) => {
        setDatValues((prev) => [...prev, item[0]]);

      });
    }

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


    //Convertir objeto a arreglo
    function formatData() {
      //Convertir objeto de cada elemento de data a arreglos
        let arr = [];
        data.map((itemData, index) => {
          const entradas = Object.entries(itemData);
          const [claves, valores] = entradas;
          entradas.map((it) => (
            arr.push(it)
          ))
          
        });

        // //Extraer en asubarreglos los elementos que sean iguales
        const arreglosIguales = [];
        const grupos = {};
        for (let i = 0; i < arr.length; i++) {
          const elemento = arr[i];
          const llave = arr[i][0];

          if (grupos[llave]) {
            grupos[llave].push(elemento);
          } else {
            grupos[llave] = [elemento];
          }
        }

        for (const clave in grupos) {
          arreglosIguales.push(grupos[clave]);
        }

        //Anotar los index de los elemetos que no tienen valores nulos 
        // y agregarles su etqiueta a los que sí
        let indicesAEliminar = []
        arreglosIguales.map((item, index) => {
          if (!datValues.includes(item[0][0])) {
            
            indicesAEliminar.push(index)
          }else{
            item.unshift(['variable', 'count']);
          }
        })

        //Eliminar elementos dado los indices
        indicesAEliminar.sort((a, b) => b - a); // Ordenar los índices en orden descendente

        for (let i = 0; i < indicesAEliminar.length; i++) {
          arreglosIguales.splice(indicesAEliminar[i], 1);
        }

        setDataChar(arreglosIguales);
        if (dataChar.length > 0) {
          setDisplayTable(true);
        }
    }  

  

    let options = {
        legend: { position: "none" },
      };
      
    function startQuery() {
      getDatValues();
      formatData();

    }
    return(

        <>
            
            <h4> 1) Distribución de variables numéricas</h4>
            <br></br>
             
            {!displayTable && (
            <Button style={{backgroundColor: "#3f20ba"}}  onClick={startQuery}>
               Consulta con tres clic's
             </Button>
            )}
            

            <br></br>

            {displayTable && (
            <div 
              className="histogramFlex" 
              style={{display: "flex", overflow: "scroll", width: "95%"}}
            >
              {dataChar.map((item, index) => (
              <div key={index}>
                  <p className="text-center">{item[1][0]}</p>
                  <Chart
                  chartType="Histogram"
                  height="400px"
                  width="350px"
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

export { EdaPaso31 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 


/*

*/
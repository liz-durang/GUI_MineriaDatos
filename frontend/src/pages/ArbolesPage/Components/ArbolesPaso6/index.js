
import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { set, useForm } from "react-hook-form";
import { Chart } from "react-google-charts";

function ArbolesPaso6({varAnalizar, displayPronostico}) {

  const [displayReporte, setDisplayReporte] = useState(false);
  const [roc_c, setRoc_c] = useState([]);
  const [Xroc_c, setXRoc_c] = useState([]);
  const [Yroc_c, setYRoc_c] = useState([]);

  const [roc_auc, setRoc_auc] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  let valorRoc_auc = '';
  //let dataChart = [];


  function getData() {
    let url = `/trees/roc-curve?variable=${varAnalizar}`
    instance.get(url)
    .then(function (response) {
      setRoc_c(response.data.roc_c)
      setRoc_auc(response.data.roc_auc)
      
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
    
  }

  //Dar formato a los datos de la curva 
  function formatDescription() {
    let arr1 = []
    let arr2 = []
    //Para curva roc
    if (roc_c !== undefined) {
      setDataChart(Object.values(roc_c))
    }

    if (roc_c !== undefined) {
      let aux = []
      aux = dataChart[0]?.map((element, index) => [element, dataChart[1][index]]);
      setDataChart(aux)

      // Agregar header a los datos
      setDataChart([["x_values", "y_values"], ...dataChart]);
    }
    
    

    //Para AUC
    valorRoc_auc = Object.values(roc_auc)
    //setValorRoc_auc(Object.values(roc_auc))
  }

  
  console.log(dataChart)
  
  //Acciones del formulario
  const {handleSubmit} = useForm();
  const onSubmit = () =>{
    getData();

    formatDescription(); 
  }
    
  return (
    <>
       <h3>Paso 6: Validar con la curva ROC </h3>

        {!displayPronostico && (
          <p>Crea el modelo en el paso 4 para poder ver su curva ROC.</p>

        )}

        {(displayPronostico) && (
        <>
          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-auto me-1 mt-3">
              <label>Consulta con doble clic</label>
              <br></br>
                <Button 
                    className="mt-1"
                    type="submit" 
                    value="Enviar" 
                    style={{backgroundColor: "#3f20ba"}}    
                >
                    Consultar validación
                </Button>
            </div>
          </form>
        </>
        )}

        {/* AUC para la clase */}
        <br></br>
        <p>El AUC para la clase 1 es <b> {valorRoc_auc} </b> </p>
        
        {/* Curva ROC*/}

        <div className="table-responsive" style={{width: "100%"}}>
            <Chart
              chartType="Line"
              height="400px"
              data={dataChart}
            />  
          </div>  


      
    </>
  );
}

export {ArbolesPaso6};
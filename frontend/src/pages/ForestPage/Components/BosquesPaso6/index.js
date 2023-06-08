
import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { set, useForm } from "react-hook-form";
import { Chart } from "react-google-charts";

function BosquesPaso6({varAnalizar, displayPronostico}) {

  const [displayCurva, setDisplayCurva] = useState(false);
  const [roc_c, setRoc_c] = useState([]);

  const [roc_auc, setRoc_auc] = useState([]);
  let valorRoc_auc = '';
  let dataChart = [];


  function getData() {
    let url = `/forest/roc-curve?variable=${varAnalizar}`
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
  function  formatDescription () {
    let aux = [["x_values", "y_values"]];
    //Para curva roc
    dataChart = Object.values(roc_c);
    if (dataChart !== undefined) {

      dataChart[0]?.map((element, index) => aux.push([element, dataChart[1][index]]));
      
      dataChart = aux;
      //Para AUC
     valorRoc_auc = Object.values(roc_auc)
    }
  }

  formatDescription(); 
  
  //Acciones del formulario
  const {handleSubmit} = useForm();
  const onSubmit = () =>{
    getData();
    if (dataChart.length > 0) {
      setDisplayCurva(true);
    }
    
    
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
            <div className="col-auto me-1 mt-0">
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

        {displayCurva && (
        <>
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
        )}

    </>
  );
}

export {BosquesPaso6};
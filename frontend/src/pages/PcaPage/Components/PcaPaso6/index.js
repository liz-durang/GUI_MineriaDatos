
import React from "react";
import { instance } from "../../../Axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { PcaPaso7 } from "../PcaPaso7";
import '../index.css';

function PcaPaso6() {

  let baseURL = '/pca/relevance?charge='

  const [relevance, setRelevance] = useState();
  const [displayTable, setDisplayTable] = useState(false);
  const [charges, setCharges] = useState([]);

  let diccDatos = [];
  let diccData = [];

  function getData (url) {
    instance.get(url)
    .then(function (response) {
      setCharges(response.data.charges)
  
      setDisplayTable(true);
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
    .finally(function () {
      // siempre sera executado
    });
  }

  //Convertir el arreglo de objetos a un arreglo de arreglos
  function formatData() {
    if (charges !== undefined) {

      //Obtener diccionario de datos
      charges.map(dat => (
        diccDatos.push(Object.keys(dat))
      )); 
      
      diccDatos = diccDatos.slice(1,2);  

      let arr = [];
      if (diccDatos[0] !== undefined) {
        diccDatos[0].map(dat => ( 
          arr.push(dat)
        ))

        diccDatos = arr; 
        
      }

      //Obtener valores de los registros. 
      charges.map(dat => ( 
        diccData.push(Object.values(dat))
      ));

      
    }
  }

  formatData();
  
  const {register, handleSubmit} = useForm();

  const onSubmit = (data) =>{
    let url = baseURL + data.nComponent;
    setRelevance(data.nComponent);  
    getData(url);
     
  }

  return (
    <>
        <h3>Paso 6: Se examina la proporción de relevancias –cargas–</h3>
        <br></br>

        <p>Se revisan los valores absolutos de los componentes principales seleccionados. </p>
        <p>Cuanto mayor sea el valor absoluto, más importante es esa variable en el componente principal.</p>
        <br></br>
 
        <form onSubmit={handleSubmit(onSubmit)} >
          <label>Selecciona un valor de carga</label>
          <br></br>
          <select className="form-select my-2 me-2" aria-label="Default select example" style={{width: "20%", display: "inline"}}
            {...register('nComponent', {
            required: true
          })}> 
            <option value="1">Uno</option>
            <option value="2">Dos</option>
            <option value="3" defaultValue>Tres</option>
            <option value="4">Cuatro</option>
            <option value="5">Cinco</option>
            <option value="6">Seis</option>
            <option value="7">Siete</option>
            <option value="8">Ocho</option>
            <option value="9">Nueve</option>  
            <option value="10">Diez</option> 
          </select>
          <Button type="submit" value="Enviar" style={{backgroundColor: "#3f20ba"}}>Seleccionar</Button>
        </form>

        <br></br>
        {displayTable && (<div className="esquema ">
          <table className="table table-striped-columns">
            <thead className="table-light">
              <tr>
                {diccDatos.map((head,index) => (
                  <th scope="col" id={index}> {head} </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {diccData.map((item, index) => (
                <tr id={index}>
                  {item.map((it, index) => (
                     <td id={index}>
                      {it}
                    </td>
                  ))}
                </tr>
              ))}  
            </tbody>
          </table>
        </div> 
        )}

        {!displayTable && ( 
        <>
          <div className="spinner-border text-secondary mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          <p className="text-black-50 font-monospace"> En espera de que selecciones el valor de carga</p>
        </>
           )}
      <br></br><br></br>

        <PcaPaso7
          diccDatos = {diccDatos}
          displayTable = { displayTable }
        />

    </>
  );
}

export { PcaPaso6 };
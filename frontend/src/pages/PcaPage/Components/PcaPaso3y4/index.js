
import React from "react";
import {  useState } from "react";
import { instance } from "../../../Axios";
import Button from "react-bootstrap/esm/Button";
import '../index.css';
import { useForm } from "react-hook-form";
import { PcaPaso5 } from "../PcaPaso5";

function PcaPaso3y4() {

  let baseURL = '/pca/variance?n_components='

  const [cum_variance, setCum_variance] = useState([]);
  const [eigen, setEigen] = useState([]);
  const [component, setComponent] = useState();
  const [displayTable, setDisplayTable] = useState(false);

    function getData (url) {
      instance.get(url)
      .then(function (response) {
        setEigen(response.data.pca_components);
        setCum_variance(response.data.cum_variance);
        //console.log(cum_variance);
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

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) =>{
      
      let url = baseURL + data.nComponent;
      setComponent(data.nComponent);
      console.log(url);
      getData(url)
      
    }

  return (
    <>
        <h3>Pasos 3 y 4: Se calcula la matriz de covarianzas o correlaciones, y se calculan los componentes (eigen-vectores) y la varianza (eigen-valores)</h3>
        <br></br>

        <form onSubmit={handleSubmit(onSubmit)} >
          <label>Selecciona un número de componentes</label>
          <br></br>
          <select className="form-select my-2 me-2" aria-label="Default select example" style={{width: "20%", display: "inline"}}
            {...register('nComponent', {
            required: true
          })}> 
            <option value="3">Tres</option>
            <option value="4">Cuatro</option>
            <option value="5">Cinco</option>
            <option value="6" defaultValue >Seis</option>
            <option value="7">Siete</option>
            <option value="8">Ocho</option>
            <option value="9">Nueve</option>  
          </select>
          <Button type="submit" value="Enviar" style={{backgroundColor: "#3f20ba"}}>Seleccionar</Button>
        </form>
       
       <br></br>
        {displayTable && (<div className="esquema varianza">
          <table className="table table-striped-columns">
            <tbody>
              {eigen.map(item => (
                <tr id={eigen.indexOf(item)}>
                  {item.map(it => (
                     <td id={item.indexOf(it)}>
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
          <p className="text-black-50 font-monospace"> En espera de que selecciones el número de componentes</p>
        </>
           )}
      
      
        <br></br><br></br>
       <PcaPaso5
        nComponent={component}
        cum_variance={cum_variance}
        displayTable={displayTable}
       />
    </>
  );
}

export { PcaPaso3y4 };
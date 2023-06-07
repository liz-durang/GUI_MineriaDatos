
import React from "react";
import { instance } from "../../../Axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PcaPaso5 } from "../PcaPaso5";
import Button from "react-bootstrap/esm/Button";

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
        {displayTable && (
        <div className="table-responsive" style={{width: "100%", height: "auto"}}>
          <table className="table table-striped-columns">
            <tbody>
              {eigen.map((item, index) => (
                <tr key={index}>
                  {item.map((it, index) => (
                     <td key={index}>
                      {it}
                    </td>
                  ))}
                </tr>
              ))}  
            </tbody>
          </table>
        </div> 
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
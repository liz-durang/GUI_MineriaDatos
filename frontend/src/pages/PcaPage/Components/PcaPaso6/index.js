
import React from "react";
import { instance } from "../../../Axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PcaPaso7 } from "../PcaPaso7";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

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
  formatData();

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

  
  
  const {register, handleSubmit} = useForm();

  const onSubmit = (data) =>{
    let url = baseURL + data.charge;
    setRelevance(data.nComponent);  
    getData(url);
    console.log(url)
     
  }

  return (
    <>
        <h3>Paso 6: Se examina la proporción de relevancias –cargas–</h3>
        <br></br>

        <p>Se revisan los valores absolutos de los componentes principales seleccionados. </p>
        <p>Cuanto mayor sea el valor absoluto, más importante es esa variable en el componente principal.</p>
        <br></br>
 
        <form onSubmit={handleSubmit(onSubmit)} className="row" >
          <div className="col-auto me-1">
            <label>Ingresa una carga</label>
            <input
            className="form-control mt-1"
            type="text"
            placeholder="0.5"
            {...register('charge', {
                required: true
            })}
            />
          </div>
          <div  className="col-auto me-1">
            <label>Da clic aqui</label>
            <br></br>
            <Button 
              type="submit" 
              value="Enviar" 
              style={{backgroundColor: "#3f20ba"}}
            >
              Consultar

            </Button>
          </div>
        </form>

        <br></br>
        {displayTable && (
        <div className="table-responsive" style={{width: "100%"}}>
          <Table className="table table-striped-columns">
            <thead className="table-light">
              <tr>
                {diccDatos.map((head,index) => (
                  <th scope="col" key={index}> {head} </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {diccData.map((item, index) => (
                <tr key={index}>
                  {item.map((it, index) => (
                     <td key={index}>
                      {it}
                    </td>
                  ))}
                </tr>
              ))}  
            </tbody>
            
          </Table>
        </div> 
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

/*


*/
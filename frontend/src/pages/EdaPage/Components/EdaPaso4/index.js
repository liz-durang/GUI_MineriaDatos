import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../Axios";
import Table from 'react-bootstrap/Table';
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/esm/Button";
import { TdCell } from "../../../PcaPage/Components/TdCell";

function EdaPaso4() {

    const baseURL1 = '/eda/upper_triangle?variable='
    const baseURL2 = '&param='
    
    const [categoricas, setCategoricas] = useState([]);
    const [queryOk, setQueryOk] = useState(true);
    const [statistics, setStatistics] = useState([]);
    const [dataNull, setDataNull] = useState([]);
    const [displayTable, setDisplayTable] = useState(false);
    let invertido = []
    let varNull = []

    useEffect(() => {
        getCategoricas();
        getVarNull();
        
        
    }, [])

   //obtener variables categóricas
   const getCategoricas = () => {
        let auxCategoricas = [];
        instance.get('/eda')
        .then(function (response) {
        // manejar respuesta exitosa
        let aux = response.data.data[0];
        const entradas = Object.entries(aux);
        const [claves, valores] = entradas;

        entradas.map((item) => {
            if ( typeof item[1] == "string" ) {
                auxCategoricas.push(item[0])
            }
        })

        setCategoricas(auxCategoricas);
        
        })
        .catch(function (error) {
        // manejar error
        console.log(error);
        })
        .finally(function () {
        
        });
    }

    //obtener la consulta dado la variable y el parámetro del usuario ingresado
    function getData (url) {
        instance.get(url)
        .then(function (response) {
          //console.log(response.data.upper_triangle)
          setStatistics(response.data.upper_triangle)
          setQueryOk(true);
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
          setQueryOk(false);
        })
        .finally(function () {
          // siempre sera executado
        });
        
        
    }

    formatData();
    //Pasar los valores obtenidos de la query a un arreglo para poder aplicarle reverse
    function formatData(){
        if (statistics.length > 0) {
            statistics.map((item) => {
                invertido.push(item);
            })
        }

        if (dataNull.length > 0) {
            dataNull.map((item) => {
                varNull.push(item);
            })
        }
        
    }
    console.log(invertido)


    //obtener variables con null
    function getVarNull() {
        instance.get('/eda/null_var')
        .then(function (response) {
          // manejar respuesta exitosa
          let aux = response.data.null_variables;
          
          setDataNull(Object.keys(aux));
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        });
        
    }


    //Acciones del formulario
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) =>{
      let url = baseURL1 + data.variable + baseURL2 + data.parameter;
      console.log(url);
      getData(url);
      setDisplayTable(true)
      
    }
    return(

        <>
        <h3>Paso 4: Identificación de relaciones entre pares variables </h3>
        <br></br>
        <p>
        Una matriz de correlaciones es útil para analizar la relación entre las variables numéricas.
        </p>

         {/* Formulario */}
         <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-auto me-1">
                <label>Selecciona una variable</label>
                
                <select 
                    className="form-select mt-1" 
                    aria-label="Default select example"
                    {...register('variable', {
                    required: true
                })}> 
                
                {categoricas.map((item) => (
                        <option value={item} defaultValue={item}>{item}</option>
                    ))}
                    
                </select>
            </div>
            <div className="col-auto me-1">
                <label>Ingresa un parámetro</label>
                
                <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Mexico"
                    {...register('parameter', {
                        required: true
                    })}
                />
            </div>
            <div className="col-auto me-1">
                <label>Da doble clic aqui</label>
                <br></br>
                <Button 
                    className="mt-1"
                    type="submit" 
                    value="Enviar" 
                    style={{backgroundColor: "#3f20ba"}}    
                >
                    Consultar
                </Button>
            </div>
        </form>

        {/* Si lo que pidió el usuario no se encontró */}

        {!queryOk && (
            <>
                <br></br>
                <p>No se ha encontrado ninguna consulta con esos datos. Intenta de nuevo.</p>
            </>
        )}

        {/* Mapa de correlaciones */}
        
        {displayTable && (
        <div className="esquema mt-3">
          <table className="table ">
            <tbody>
              {invertido.reverse().map((item, index) => (
                <tr id={index}>
                  {item.reverse().map((it, index) => (
                     <TdCell
                        id={index}
                        value={it} 
                      />

                  ))}
                </tr>
              ))}  
            </tbody>
            <tfoot>
              <tr>
                  
                  {varNull.reverse().map((head, index) => (
                    <th scope="col" id={index}> {head} </th>
                  ))}
                  <th scope="col"> {''} </th>
              </tr>
            </tfoot>
          </table>
        </div> 
        )}
        
        </>
    );
    
}

export { EdaPaso4}
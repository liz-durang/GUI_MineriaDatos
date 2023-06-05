import React from "react";
import { useEffect, useState } from "react";
import { instance } from "../../../../../Axios";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import '../../../../../index.css';

function EdaPaso34() {

    const [categoricas, setCategoricas] = useState([]);
    const [queryOk, setQueryOk] = useState(true);
    const [displayTable, setDisplayTable] = useState(false);
    const [statistics, setStatistics] = useState([]);
    const [queryStadistics, setQueryStadistics] = useState([]);
    const baseURL1 = '/eda/statistics?variable='
    const baseURL2 = '&param='

    useEffect(() => {
        getCategoricas();
        
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
          //console.log(response.data.statistics)
          setStatistics(response.data.statistics)
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
        
        formatData(); 
    }

    //console.log(statistics)
    
    //Formatear los datos obtenidos para mostarlos 
    function formatData() {
        // if (statistics != undefined) {
            //Obtener los valores de las estadisticas
            let arregloKeys = Object.keys(statistics).map((key)=> {
                const innerObj = statistics[key];
                return Object.keys(innerObj);
            })
            arregloKeys = arregloKeys[0];
            // console.log(arregloKeys)

            //Convertir objeto de objetos en arreglo de arreglos
            let arregloValues = [];
            arregloValues = Object.keys(statistics).map((key) => {
                const innerObj = statistics[key];
                return Object.values(innerObj);
            });
            // console.log(arregloValues)

            //Extraer subarreglos de los valores por índices
            let subarreglos = [];
            if (arregloValues.length > 0) {
                for (let i = 0; i < arregloValues[0].length; i++) {
                    const subarreglo = arregloValues.map((arreglo) => arreglo[i]);
                    subarreglos.push(subarreglo);
                }
                
                // console.log(subarreglos);

                //Unir valores de las estadisticas con los subarreglos
                let count = 0;
                subarreglos.map((arreglo) => {
                    
                    arreglo.unshift(arregloKeys[count]);
                    count = count + 1;
                });
                setQueryStadistics(subarreglos);
                setDisplayTable(true);
            // }
            

        }
    }



    //Acciones del formulario
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) =>{
      let url = baseURL1 + data.variable + baseURL2 + data.parameter;
      console.log(url);
      getData(url);
      
    }
    


    return(
        <>
        <br></br><br></br>
        <h4> 2) Distribución de variables categóricas</h4>
        
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

        {/* Tabla con los datos de la consulta */}
        {displayTable && (
            <div className="esquema mt-4">
            <Table className="table table-striped-columns">
                <thead className="table-light">
                <tr>   
                    <th></th>
                    {categoricas.map((head, index) => (
                    <th scope="col" id={index}> {head} </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {queryStadistics.map((item, indexx) => (
                        <tr key={indexx}>
                            {item.map((it, index) => (
                                <td key={index}>{it}</td>
                            ))}
                            
                        </tr>
                    ))}
                    
                </tbody>       
            </Table>
            </div> 
        )}
        </>
    );

}

export { EdaPaso34 }
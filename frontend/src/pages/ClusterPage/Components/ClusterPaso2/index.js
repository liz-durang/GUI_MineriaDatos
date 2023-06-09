import React from "react";
import { instance } from "../../../Axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { useForm } from "react-hook-form";
import { ClusterPaso22 } from "../ClusterPaso22";
import { ClusterPaso23 } from "../ClusterPaso23";
import { ClusterPaso24 } from "../ClusterPaso24";


function ClusterPaso2({displayTable}) {

    const [data, setData] = useState([]);
    const [headerData, setHeaderData] = useState([]);
    const [displayModel, setDisplayModel] = useState(false);

    function getData() {
        instance.get('/cluster/standarize')
        .then(function (response) {
            setData(response.data);
          
        })
        .catch(function (error) {
          // manejar error
          console.log(error);
        })
        .finally(function () {
          // siempre sera executado
        });
        formatDescription() 
    }

    console.log(data)

    //Dar formato a los datos para mostrarlos
    function formatDescription() {

        //Guardar nombre de las variables
        let header2 = []
        Object.entries(data).map(([clave,valor]) => {
        header2 = Object.keys(valor)
        })
        setHeaderData(header2);
        setDisplayModel(true);
        
    }

    //Acciones del formulario
    const {handleSubmit} = useForm();
    const onSubmit = () =>{
        getData();
    }

    console.log(headerData)
    console.log(displayTable)

    return(
        <>
            <h3>Paso 2: Creación de modelos</h3>
            <br></br>

            {!displayTable && (
            <p>Ingresa el nombre de la variable en el paso 1 para crear su modelo.</p>

            )}


            {displayTable && (
            <>
                <h4>Modelo 1: Segmentación particional <br></br><br></br>  Algoritmo: K-means</h4> 
                <br></br>
                <p>
                    Los clústeres mediante K-means es un aprendizaje no supervisado popular.
                    Se utiliza para encontrar grupos intrínsecos dentro del conjunto de datos sin etiquetar 
                    y extraer inferencias de ellos.
                </p>
    
                {!displayModel && (
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
                            Crear modelo
                        </Button>
                    </div>
                </form>
                </>
                )}
            </>
            )}   

                {displayModel && (
                <>
                    {/* Escalar datos*/}
                    <br></br>
                    <h5>1) Escalar datos</h5>
                    <br></br>
    
                    <div className="table-responsive" style={{width: "100%", height: "45vh"}}>
                    <Table className="table table-striped-columns">
                        <thead className="table-light">
                        <tr>
                            <th></th>
                            {headerData.map((head, index) => (
                            <th scope="col" key={index}> {head} </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {
                        Object.entries(data).map(([clave,valor]) => (
                            <tr key={clave}>
                            <td>{clave}</td>
                            {headerData.map((item, key) => (
                            <td key={key}>{valor[item]}</td>
                            ))}     
                            </tr>
                        ))
                        }
                    </tbody>     
                    </Table>
                    </div>

                    
                </>        
                )}  

        <ClusterPaso22
            displayModel={displayModel}
         />
        <ClusterPaso23
            displayModel={displayModel}
         />

      <ClusterPaso24
            displayModel={displayModel}
         />

        
             
        </>

    );

}

export {ClusterPaso2};
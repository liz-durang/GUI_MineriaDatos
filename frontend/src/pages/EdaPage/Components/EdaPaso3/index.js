import React from "react";
import { EdaPaso31 } from "./components/EdaPaso31";
import { EdaPaso34 } from "./components/EdaPaso34";


//Recibe a las variables que tienen nulls
function EdaPaso3({dataValues}) {

   
  
    return(

        <>
        <br></br><br></br>
        <h3>Paso 3: Detección de valores atípicos</h3>
        
        <p>
            Para las variables numéricas, se observa cuántas veces aparecen grupos de números en una columna. 
            <br></br>Mientras que para las variables categóricas, son las clases de cada columna y su frecuencia.
        </p>
        <EdaPaso31
            dataValues = {dataValues} 
        />
        <EdaPaso34
           
        />

        </>
    );
    
}

export { EdaPaso3 }

/*
Metodo del codo - Identificar el error. Ese error es la difrerencia del elemento al que pertenece y al centroide. 
En un inicio el error es grande. Pero conforme se vayan obteniendo tras configuraciones de k, esta empieza a disminuir.
*/ 

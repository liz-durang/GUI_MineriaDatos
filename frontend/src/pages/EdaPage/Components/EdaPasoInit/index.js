
import React from "react";
import { instance } from "../../../Axios";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { EdaPaso0 } from "../EdaPaso0";
import { EdaPaso1 } from "../EdaPaso1";
import { EdaPaso2 } from "../EdaPaso2";
import { EdaPaso4 } from "../EdaPaso4";

function EdaPasoInit() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSaved, setFileSaved] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileSaved(false)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await instance.post('/pca/upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Procesar respuesta exitosa...
      setFileSaved(response.data.saved)
    } catch (error) {
      // Manejar el error...
      console.log(error);
    }
  };

    console.log(fileSaved)
    console.log(selectedFile)


  return (
    <>
        <h3>Sube el archivo que contiene tu dataset</h3>
        <br></br>

        {/* Formulario */}
        <form onSubmit={handleFormSubmit} className="row">
          <div className="col-auto me-1 mt-3">
            <input 
              className="form-control" 
              type="file" id="formFile"  
              name="files" 
              onChange={handleFileChange}
            />
            </div>
            <div className="col-auto me-1 mt-3">
              <Button 
                className="mt-1"
                type="submit" 
                value="Enviar" 
                style={{backgroundColor: "#3f20ba"}}    
              >
                Subir Archivo
              </Button>
            </div>
        </form>

      {fileSaved && (
        <>
          <br></br><br></br>
          <EdaPaso0
            fileSaved= {fileSaved}
          />
          <br></br><br></br>
          <EdaPaso1
            fileSaved= {fileSaved}
          /> 
          <br></br><br></br>
          <EdaPaso2/> 
          <br></br><br></br>
          <EdaPaso4/> 
        </>
      )}
        
        <br></br>
      </>
  )
}

export {EdaPasoInit};
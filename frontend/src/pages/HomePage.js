import React from "react";
import Button from 'react-bootstrap/Button';
import './stylePages.css';

import crisp from '../assets/CRISP-DM.png';
import { useNavigate } from "react-router-dom";


function HomePage() {

  const navigate = useNavigate();
  const startProcess = () => {
    navigate('/eda');
  }
  return (
    <div className="page p-4">
      
      <main>
      
        <h2 className="display-4 mb-4">Mineria de Datos</h2>
        
        <hr></hr>
        <br></br>
        <p>Es el proceso computacional para la exploración y análisis inteligente de datos como apoyo para el proceso de la toma de decisiones.</p>
        <div className="imgCrisp">
          <img src={crisp} className="img-fluid" alt="metodología crisp-dm"/>
        </div>
        
        <Button style={{backgroundColor: "#3f20ba"}} size="lg" onClick={startProcess}>Comenzar ahora</Button>
      
      </main>

    </div>
    
  );
}

export { HomePage };

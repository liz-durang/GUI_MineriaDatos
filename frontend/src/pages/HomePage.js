import React from "react";
import Button from 'react-bootstrap/Button';
import './stylePages.css';

import crisp from '../assets/CRISP-DM.png';
import { useNavigate } from "react-router-dom";
import { GiMining } from "react-icons/gi";
import { BsArrowRight } from "react-icons/bs";

function HomePage() {

  const navigate = useNavigate();
  const startProcess = () => {
    navigate('/eda');
  }
  return (
    <div className="page p-4">
      
      <main className="homepage">
      
        <h2 className="display-4 mb-4"> <GiMining/> Mineria de Datos</h2>
        
        <hr></hr>
        <br></br>

        <p>La mineria de datos es el proceso computacional para la exploración y análisis inteligente de datos como apoyo para el proceso de la toma de decisiones.</p>

        <br></br>

        <p>En la actualidad la Mineria de Datos tiene como propósito resolver dos grandes retos:</p>

        <ol>
          <li>
            Trabajar con conjuntos de datos para extraer y descubrir información de interés.
          </li>
          <li>
            Usar algoritmos adecuados para analizar e identificar tendencias y comportamientos que faciliten una mejor comprensión de los fenómenos que ocurren en el entorno y sirvan de ayuda en el proceso de la toma de decisiones.
          </li>
        </ol>

        <br></br>

        <p>Y la elección de la herramientas de mineria de datos más adecuada dependerá de los requisitos del proyecto, las preferencias del usuario y la disponibilidad de recursos. Siento este último factor uno de los impedimentos para acceder a alguna herramienta comercial. </p>
        <br></br>
        <div className="enphasis p-3">
        <p> ¡Bienvenid@! 👋 A nuestra plataforma de aprendizaje, donde encontrarás una demo interactiva sobre el uso de <b> algoritmos </b> de Minería de Datos
        para realizar un análisis <b> inteligente de datos </b>. Nuestra plataforma usa el <b> modelo CRISP-DM </b>, comienza a explorarla ahora.</p>
        </div>
        <br></br>
        <br></br>

        <Button style={{backgroundColor: "#3f20ba"}} size="lg" onClick={startProcess}>
          <span>Comenzar ahora </span>
           
          <BsArrowRight/>
        </Button>

        <br></br> <br></br><br></br><br></br>

        <h3 className="display-6" >CRISP-DM (Cross-Industry Standard Process for Data Mining)</h3>

        <br></br>

        <p> CRISP-DM es un modelo de proceso estándar utilizado en la minería de datos y el análisis de datos. Fue desarrollado en 1996 y se ha convertido en una metodología ampliamente utilizada para guiar proyectos de este tipo.</p>

        <p>Este modelo proporciona un enfoque estructurado y paso a paso para llevar a cabo proyectos de minería de datos, desde la comprensión del problema hasta la implementación de las soluciones. </p>

        <div className="imgPages">
          <img src={crisp} className="img-fluid" alt="metodología crisp-dm"/>
        </div>
          
        
      
      </main>

    </div>
    
  );  
}

export { HomePage };








import {MdTravelExplore } from "react-icons/md"
import {CgComponents} from "react-icons/cg"
import {VscListTree} from "react-icons/vsc"
import {MdOutlineForest} from "react-icons/md";  

export const routesApp = [
    {
      icon: <MdTravelExplore/>,
      to: '/eda',
      text: ' Análisis Exploratorio de Datos'
    },
    {
      icon: <CgComponents/>,
      to: '/pca',
      text: ' Análisis de Componentes Principales'
    },
    {
      icon: <VscListTree/>,
      to: '/arboles',
      text: ' Árbol de Decisión Clasificación'
    },
    {
      icon: <MdOutlineForest/>,
      to: '/bosques',
      text: ' Bosques Aleatorios Clasificación'
    },
  ];
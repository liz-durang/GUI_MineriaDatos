import { useState } from "react";
import { NavLink } from "react-router-dom";
import { routesApp } from "../../routes";
import './styleMenu.css';
import { GiMining } from "react-icons/gi";
import { SiNotion } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineGithub } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { NavSide } from "./responsiveMenu";
import { HambugerButton } from "./responsiveMenu";


function Menu() {

  const [click, setClick] = useState(false);

  const changeClick = () => {
    setClick(!click)
    console.log(click)
  }

  return (
    <>
      <NavSide className="p-4 navSide" click={click} style={{overflow: "scroll"}}>
          <h3 className="fw-bold fs-5 mb-2">Home</h3>
          <NavLink
              key='/'
              to='/'
              className={"text-body-tertiary text-decoration-none p-2 m-3 rounded-2 navLink"}
              style={({isActive}) => ({
                color: isActive ? '#fcfcfd': "#212529",
                backgroundColor: isActive ? "#7f5ad5": 'white'
                })}
              onClick={() => changeClick()}
              > 
            <GiMining/>
            <p style={{display: "inline"}} > ¿Qué es Mineria de Datos?</p>
            </NavLink>  

          <h3 className="fw-bold fs-5 mb-2 mt-4 ">Algoritmos</h3>
          
          
          {routesApp.map(route => (
              <NavLink
                key={route.to}
                to={route.to}
                className={"text-body-tertiary text-decoration-none p-2 m-3 rounded-2 navLink"}
                style={({isActive}) => ({
                  color: isActive ? '#fcfcfd': "#212529",
                  backgroundColor: isActive ? "#7f5ad5": 'white'
                })}
                onClick={() => changeClick()}
              > 
                {route.icon}
                {route.text}
              </NavLink>
          ))}


          <h3 className="fw-bold fs-5 mb-2 mt-4">Acerca de</h3>
          <NavLink
              target="_blank"
              key='https://stingy-lung-bed.notion.site/fd46bdb9aefc46669e0404c9eb5872ce?v=70b569831dea412daeb23853f4bfa311&pvs=4'
              to='https://stingy-lung-bed.notion.site/fd46bdb9aefc46669e0404c9eb5872ce?v=70b569831dea412daeb23853f4bfa311&pvs=4'
              className={"text-body-tertiary text-decoration-none p-2 m-3 rounded-2 navLink"}
              style={({isActive}) => ({
                color: isActive ? '#fcfcfd': "#212529",
                backgroundColor: isActive ? "#7f5ad5": 'white'
                })}
              onClick={() => changeClick()}
              > 
            <SiNotion/>
            <p style={{display: "inline"}}> Wiki - Proyecto</p>
            </NavLink>  
            
            <NavLink
              target="_blank"
              key='https://github.com/liiz-durang/GUI_MineriaDatos'
              to='https://github.com/liiz-durang/GUI_MineriaDatos'
              className={"text-body-tertiary text-decoration-none p-2 m-3 rounded-2 navLink"}
              style={({isActive}) => ({
                color: isActive ? '#fcfcfd': "#212529",
                backgroundColor: isActive ? "#7f5ad5": 'white'
                })}
              onClick={() => changeClick()}
              > 
            <AiOutlineGithub/>
            <p style={{display: "inline"}}> Github - Proyecto</p>
            </NavLink>
      </NavSide>
      
      <HambugerButton onClick={() => changeClick()}>
        {
          click ? 
          <GiHamburgerMenu style={{
            cursor: 'pointer',
            fontSize: '1.7rem'
          }}/>
          :
          <FaTimes style={{
            cursor: 'pointer',
            fontSize: '1.7rem'
          }}/>
        }
      </HambugerButton>
      
    </>

  );
}

export { Menu };
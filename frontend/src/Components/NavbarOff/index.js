
import Navbar from 'react-bootstrap/Navbar';
import '../Menu/styleMenu.css';
import { GiMining } from "react-icons/gi";


function NavbarOff() {
  return (
    <>
        <Navbar bg="light" className='px-4' style={{position: 'sticky', top: '0', zIndex: '5'}}>
            <Navbar.Brand href="/" style={{width: '95%'}}>
              <GiMining style={{
                fontSize: '1.5rem'
              }}/>
              <p 
                style={{display: 'inline'}} 
                className='ps-3'
                >

                Mineria de Datos

              </p>
            
            </Navbar.Brand>


            
        </Navbar>
        
    </>
  );
}

export {NavbarOff};
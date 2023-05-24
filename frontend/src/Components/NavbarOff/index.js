
import Navbar from 'react-bootstrap/Navbar';

import { GiMining } from "react-icons/gi";

function NavbarOff() {
  return (
    <>
        <Navbar bg="light" sticky='top' className='px-4'>
            <Navbar.Brand href="/">
              <GiMining/>
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
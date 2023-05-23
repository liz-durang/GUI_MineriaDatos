
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { GiMining } from "react-icons/gi";

function NavbarOff() {
  return (
    <>
        <Navbar bg="light" sticky='top'>
          <Container>
            <Navbar.Brand href="/">
              <GiMining className='pe-1'/>
              Mineria de Datos
              </Navbar.Brand>
          </Container>
        </Navbar>
    </>
  );
}

export {NavbarOff};
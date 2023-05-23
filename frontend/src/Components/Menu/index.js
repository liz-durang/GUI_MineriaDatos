
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/esm/Nav";
import { routesApp } from "../../routes";
import './styleMenu.css';

function Menu() {
  return (
    <nav className="p-4 navSide"  >
        <h3 className="fw-bold fs-5 mb-3">Proceso General</h3>
        
        {routesApp.map(route => (
          <Nav.Link
            key={route.to}
            
          >
            <NavLink
              to={route.to}
              className={"text-body-tertiary text-decoration-none p-2 m-3 rounded-2 navLink"}
              style={({isActive}) => ({
                color: isActive ? '#fcfcfd': "#212529",
                backgroundColor: isActive ? "#7f5ad5": 'white'
                
              })}
            >
              {route.text}
            </NavLink>
          </Nav.Link>
        ))}
      </nav>

  );
}

export { Menu };
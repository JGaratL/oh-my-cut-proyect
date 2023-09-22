import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import logo2image from '../images/logo-omc-circle.png';
import { FaUser, FaSearch } from 'react-icons/fa';
import { useLocation, NavLink } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Función para desplazarse suavemente a la sección correspondiente
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="main-content">
      <div className="navbar-container">
        <div className="navbar">
          <div className="logo">
            <img className="circle-logo" src={logo2image} alt="Oh my Cut" />
          </div>
          <div className="nav-link">
            {/* He sustituido botones por Links para tener enrutado */}
            <Link className="nav-item" to="/" onClick={() => scrollToSection('home')}>Home</Link>
            <Link className="nav-item" to="/" onClick={() => scrollToSection('servicios')}>Servicios</Link>
            <Link className="nav-item" to="/" onClick={() => scrollToSection('equipo')}>Equipo</Link>
            <Link className="nav-item" to="/" onClick={() => scrollToSection('empleo')}>Empleo</Link>
            <Link className="nav-item" to="/" onClick={() => scrollToSection('contacto')}>Contáctanos</Link>
            {location.pathname === '/miscitas' && (
              <NavLink className="nav-item active" to="/miscitas">Mis Citas</NavLink>
            )}
            {location.pathname === '/nueva-cita' && (
              <NavLink className="nav-item active" to="/nueva-cita">Nueva Cita</NavLink>
            )}
          </div>
          <div className="actions">
            <FaSearch className="icon" /> 
            {/* Solo mostrar botón si NO estamos en /citanoreg */}
            {location.pathname !== '/citanoreg' && (
              <NavLink to="/citanoreg">
                <Button variant="dark" className="rounded-pill" style={{ backgroundColor: 'black', color: 'white' }}>
                  Cita ONLINE
                </Button>
              </NavLink>
            )}
            <Link to="/iniciosesion">
              <FaUser className="icon" /> 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

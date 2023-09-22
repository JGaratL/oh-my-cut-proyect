import React, { useState } from 'react';
import '../styles/InicioSesion.css';
import pelo from '../images/pelo.jpg';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from '../axiosConfig'; // Importa axios desde el archivo axiosConfig
import { useNavigate } from 'react-router-dom';
import Miscitas from './Miscitas'; // Importa el componente Miscitas
import ReactDOM from 'react-dom'; // Importa ReactDOM

const InicioSesion = ({ clienteId }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleLoginSuccess = (clienteId, authToken) => {
    // Almacena el token en localStorage
    localStorage.setItem('clienteId', clienteId);
    localStorage.setItem('authToken', authToken);

    navigate('/Miscitas');
    // Renderiza el componente Miscitas y pasa cliente_id como prop
  };

  const handleSubmit = async (event) => {
    setErrorMessage('');
    event.preventDefault();
    try {
      let response;

      if (isRegistering) {
        const [nombre, apellido] = fullName.split(' ');
        response = await axios.post('http://localhost:5000/register', {
          nombre,
          apellido,
          email,
          password,
          telefono,
        });

        if (response.data && response.data.message) {
          setRegistroExitoso(true); // Establece el registro exitoso en true
        }
      } else {
        response = await axios.post('http://localhost:5000/login', { email, password });

        if (response.data && response.data.message && response.data.cliente_id) {
          console.log('Respuesta del servidor al inicio de sesión:', response.data);

          // Llama a la función handleLoginSuccess con el clienteId y el token
          handleLoginSuccess(response.data.cliente_id, response.data.token);
        } else {
          console.log('Respuesta inesperada del servidor:', response.data);

          setErrorMessage('Error al obtener el clienteId desde el servidor.');
        }
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);

      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Error al procesar la solicitud.'
      );
    }
  };

  return (
    <div className="general-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="inicio-container">
        <div className="imagen-inicio">
          <img src={pelo} alt="Foto Cabello" />
        </div>
        <div className="formulario-inicio">
          <p className='title1'>Oh My Cut!!</p>
          <p className='title2'>Tu peluquería de confianza</p>
          <p>Galardonada con el premio a mejor peluquería del año 2023</p>

          <div className="auth-options">
            <span
              className="auth-option"
              onClick={() => setIsRegistering(false)}
              style={{
                borderBottom: !isRegistering ? '3px solid beige' : '1px solid beige',
              }}
            >
              Iniciar sesión
            </span>
            <span
              className="auth-option"
              onClick={() => setIsRegistering(true)}
              style={{
                borderBottom: isRegistering ? '3px solid beige' : '1px solid beige',
              }}
            >
              Registrarse
            </span>
          </div>

          <Form onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <Form.Group className="input-box">
                  <Form.Control
                    type="text"
                    placeholder="Nombre completo"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="input-box">
                  <Form.Control
                    type="tel"
                    placeholder="Teléfono"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="input-box">
              <Form.Control
                type="email"
                placeholder="Introduce tu E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="input-box">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                title="Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Form.Group>

            <div className='container-button'>
              <Button variant="dark" className="enviar-button" type="submit">
                {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
              </Button>
              {!isRegistering && (
                <div className="forgot-password">¿Has olvidado tu contraseña?</div>
              )}
            </div>
          </Form>
        </div>
      </div>

      {/* Renderiza el componente Miscitas y pasa clienteId como prop */}
      <Miscitas clienteId={clienteId} />

      {/* Modal de Registro Exitoso */}
      <Modal show={registroExitoso} onHide={() => setRegistroExitoso(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¡Bienvenido, {fullName}! Tu registro ha sido exitoso.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setRegistroExitoso(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InicioSesion;

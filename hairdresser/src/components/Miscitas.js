import React, { useState, useEffect } from 'react';
import '../styles/NuevaCita.css';
import axios from 'axios';

const NuevaCita = ({ clienteId }) => {
  const [clienteData, setClienteData] = useState({ nombre: '', apellido: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar la autenticación y obtener datos del cliente aquí
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      setError('Por favor, inicie sesión para crear una nueva cita.');
      return;
    }

    if (!clienteId) {
      setError('No se puede crear una cita sin un cliente válido.');
      return;
    }

    // Obtener datos del cliente
    axios.get(`http://localhost:5000/obtener-cliente/${clienteId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      const { nombre, apellido } = response.data;
      // Actualizar el estado con los datos del cliente si es necesario
      setClienteData({ nombre, apellido });
    })
    .catch((error) => {
      console.error('Error al obtener los datos del cliente', error);
      setError('Hubo un error al obtener los datos del cliente. Por favor, inténtelo nuevamente.');
    });
  }, [clienteId]);

  return (
    <div className="nueva-cita-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <h2>Crear Nueva Cita</h2>
          <p>Bienvenido, {clienteData.nombre} {clienteData.apellido}</p>
          {/* Aquí puedes agregar el formulario para crear una nueva cita */}
        </>
      )}
    </div>
  );
};

export default NuevaCita;

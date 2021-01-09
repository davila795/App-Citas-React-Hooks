import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {

  //  Verificando citas iniciales del local storage y si es null pasaremos un array vacio
  const citasIniciales = JSON.parse(localStorage.getItem('citas')) || []

  //  Array de citas verficadas en el local storage
  const [citas, guardarCitas] = useState(citasIniciales)

  //  Use Effect para realizar ciertas funciones cuando el state cambia
  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas))
  }, [citas])

  //  Funcion que tome citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita])
  }

  // Funcion eliminar cita
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <>
      <h1>Administrador de Pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default App;

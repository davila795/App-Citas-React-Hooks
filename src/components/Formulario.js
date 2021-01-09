import React, { useState } from 'react';
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {

    //  Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    const [error, actualizarError] = useState(false)

    //  Funcion que se ejecuta cuando el ususario escribe en el input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //  Extraer valores de cita
    const { mascota, propietario, fecha, hora, sintomas } = cita

    // Envio de form
    const submitCita = e => {
        e.preventDefault();

        //  Validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            return actualizarError(true)
        }

        //  Eliminar el mensaje previo de error una vez validado
        actualizarError(false)

        //  Asignar un ID
        cita.id = uuid()

        //  Crear la cita
        crearCita(cita)

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return (
        <>
            <h2>Crear Cita</h2>

            {error && <p className='alerta-error'>Todos los campos son obligatorios</p>}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Propietario</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre'
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}

                ></textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                    onChange={actualizarState}
                >Agregar Cita
                </button>
            </form>

        </>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
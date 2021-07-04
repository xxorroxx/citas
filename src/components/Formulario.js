import React, { Fragment, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => { //se importa la prop

    //State de citas
    const [cita, actualizarCita] = useState({ //este useState va a ser un objeto, se agregan los datos que tenemos a cita.
        mascota:'', //inicia el proyecto con estas propiedades (vacias).
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada vez que el usuario escribe en un input.
    const actualizarState = e => {
        actualizarCita({ //se necesita una copia del state para que no se pierda la informacion a medida que se van agregando campos al input
            ...cita,
            [e.target.name] : e.target.value //leer el contenido de lo que el usuario escribe y lo añade en el state cita al mismo tiempo, el name hace referencia al campo en donde se esta escribiendo
        })
    };

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita; //se crea un objeto con estas propiedades, esto se hace para no escribir cita.mascota, cita.propietario, cita.fecha, etc..

    //Cuando el usuario presiona agregar cita (enviar formulario).
    const submitCita = e => {
        e.preventDefault(); //se utiliza para detener una acción por omisión, para que no envie el form por el metodo get o al query string
        console.log('enviando form');

        //Validar

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){ //trim elimina los campos vacios
            
            actualizarError(true);
            console.log('Hay un error');
            return; //este return es para que cuando haya un error el codigo no se siga ejecutando.
        } 

        //Eliminar mensaje de error

        actualizarError(false);

        //Asignar ID

        cita.id = uuidv4(); //librearia generadora de id's

        //Crear la cita

        crearCita(cita);

        //Reiniciar el form

        actualizarCita({
            mascota:'', 
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })

    };

                                //el ternario {error ?< si es true ejecuta <p> :null< si es false ejecuta :null}
    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios.</p>  :null} 
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width" //En el framework skeleton esta linea indica que toma todo el ancho del espacio.
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota} //esto permite resetear el formulario
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario} //esto permite resetear el formulario
                />
                <label>Nombre Mascota</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha} //esto permite resetear el formulario
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora} //esto permite resetear el formulario
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    placeholder="Ingrese Síntomas"
                    onChange={actualizarState}
                    value={sintomas} //esto permite resetear el formulario
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;
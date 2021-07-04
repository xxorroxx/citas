import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from './components/Cita'

function App() {

  //Citas en local storage 

  let citasIniciales = JSON.parse(localStorage.getItem('citas')); //JSON.parce convierte el array en string
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de las citas

  const [citas, guardarCitas] = useState(citasIniciales);

  // useEffect para realizar ciertas operaciones cunado el state cambia

  useEffect( ()=>{

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }

  }, [citas] ); // se ponene los vacios [] para que no se ejecute ciclicamente, ya que useEffect se ejecuta cuando se modifica algo.
                // Va a capturar todo lo que se medifique en citas, se llama Array de dependencias.

  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina una cita por su id

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id) // Para que no se elimine el resto de las id que son diferentes y filtre solamente esta id
    guardarCitas(nuevasCitas);
  }                                                          // se pone !== (diferente) para que en vez de eliminar al resto haga el proceso contrario
                                                             // solamente a los que son diferentes a ese id se van a filtrar.

  //Mensaje condicional
  
  const titulo = citas.length === 0 ? 'No hay citas'  : 'Administra tus Citas'; //Como citas es un array nos arroja el valor del tamaño

  return (
    <Fragment>
    <h1>Administrador de pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
        <Formulario
          crearCita={crearCita} //prop que se va a comunicar con Formulario
        />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id} //el key siempre va acompadaño del map, tienen que ser valores unicos 
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;

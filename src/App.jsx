
import { useState } from 'react'
import Encabezado from './components/Encabezado'
import Tarea from './components/Tarea'
import './App.css'

function App() {
  const [tareas, setTareas] = useState([
    {
      id: 1,
      titulo: 'Estudiar React',
      materia: 'Programación Web',
      completada: false
    },
    {
      id: 2,
      titulo: 'Realizar práctica de redes',
      materia: 'Conmutación y Enrutamiento',
      completada: false
    }
  ])

  const [titulo, setTitulo] = useState('')
  const [materia, setMateria] = useState('')

  // Agregar una tarea
  function agregarTarea(event) {
    event.preventDefault()

    if (titulo.trim() === '' || materia.trim() === '') {
      return
    }

    const tareaNueva = {
      id: Date.now(),
      titulo: titulo.trim(),
      materia: materia.trim(),
      completada: false
    }

    setTareas([...tareas, tareaNueva])
    setTitulo('')
    setMateria('')
  }

  // Completar o deshacer una tarea
  function cambiarEstado(id) {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        return {
          ...tarea,
          completada: !tarea.completada
        }
      }

      return tarea
    })

    setTareas(tareasActualizadas)
  }

  // Eliminar una tarea
  function eliminarTarea(id) {
    const tareasActualizadas = tareas.filter(
      tarea => tarea.id !== id
    )

    setTareas(tareasActualizadas)
  }

  // Contar las tareas pendientes
  const pendientes = tareas.filter(
    tarea => !tarea.completada
  ).length

  return (
    <main className="app">

      <Encabezado />

      <section className="formulario-seccion">
        <h2>Agregar una tarea</h2>

        <form
          className="formulario-tarea"
          onSubmit={agregarTarea}
        >
          <div className="campo-formulario">
            <label htmlFor="titulo">Nombre de la tarea</label>

            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={event => setTitulo(event.target.value)}
              placeholder="Ej. Estudiar React"
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="materia">Materia</label>

            <input
              id="materia"
              type="text"
              value={materia}
              onChange={event => setMateria(event.target.value)}
              placeholder="Ej. Programación Web"
              required
            />
          </div>

          <button type="submit" className="boton-agregar">
            Agregar tarea
          </button>
        </form>
      </section>

      <section className="lista-tareas">
        <h2>Mis tareas</h2>

        <p className="contador">
          Tareas pendientes: {pendientes} de {tareas.length}
        </p>

        {tareas.length === 0 && (
          <p className="mensaje-vacio">
            No tienes tareas. Agrega una nueva.
          </p>
        )}

        {tareas.map(tarea => (
          <Tarea
            key={tarea.id}
            titulo={tarea.titulo}
            materia={tarea.materia}
            completada={tarea.completada}
            onCambiarEstado={() => cambiarEstado(tarea.id)}
            onEliminar={() => eliminarTarea(tarea.id)}
          />
        ))}

        {tareas.length > 0 && pendientes === 0 && (
          <p className="mensaje-exito">
            ¡Felicidades! Completaste todas tus tareas.
          </p>
        )}

      </section>

    </main>
  )
}

export default App

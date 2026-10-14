
function Tarea(props) {
  return (
    <article className={`tarea ${props.completada ? 'tarea-completada' : ''}`}>

      <div className="tarea-contenido">
        <h3>{props.titulo}</h3>
        <p>{props.materia}</p>
      </div>

      <div className="acciones-tarea">
        <button
          type="button"
          className="boton-estado"
          onClick={props.onCambiarEstado}
        >
          {props.completada ? 'Deshacer' : 'Completar'}
        </button>

        <button
          type="button"
          className="boton-eliminar"
          onClick={props.onEliminar}
        >
          Eliminar
        </button>
      </div>

    </article>
  )
}

export default Tarea

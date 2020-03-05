import React from "react";

import "./estilos/EstiloBotonContorneado.css";

var botonContorneado = (props) => {
    return(
        <button className="btn btn-outline-primary boton">{props.etiqueta}</button>
    );
}

export default botonContorneado;
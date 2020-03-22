import React from "react";

import "./estilos/EstiloBotonContorneado.css";

var botonContorneado = (props) => {
    return(
        <button 
            className="btn btn-outline-primary bo"
            onClick={props.onClick}
            style={{
                width: props.ancho
            }}
        >
            {props.etiqueta}
        </button>
    );
}

export default botonContorneado;
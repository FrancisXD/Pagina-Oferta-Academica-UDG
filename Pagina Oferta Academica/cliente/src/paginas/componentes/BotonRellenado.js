import React from "react";

import "./estilos/EstiloBotonRellenado.css";

var botonRelenado = (props) => {
    return(
        <button className="botonRellenado" 
            onClick={props.onClick}
            onSubmit={props.onSubmit}
            style={{
                display: props.display,
                width: props.ancho,
                marginTop: props.margenSuperior,
                float: props.flotar
            }}>
            {props.etiqueta}
        </button>
    );
}

export default botonRelenado;
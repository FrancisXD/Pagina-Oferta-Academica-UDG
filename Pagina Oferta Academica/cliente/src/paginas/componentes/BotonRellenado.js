import React from "react";

import "./estilos/EstiloBotonRellenado.css";

var botonRelenado = (props) => {
    return(
        <button className="botonRellenado" 
            onClick={props.onClick}
            style={{
                display: props.display
            }}>
            {props.etiqueta}
        </button>
    );
}

export default botonRelenado;
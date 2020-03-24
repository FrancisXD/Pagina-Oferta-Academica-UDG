import React from "react";

import "./estilos/EstiloBotonRellenado.css";

var botonRelenado = (props) => {
    return(
        <button className="botonRellenado" 
            onClick={props.onClick}
            onSubmit={props.onSubmit}
            style={{
                display: props.display,
                width: props.ancho || "100px",
                marginTop: props.margenSuperior || "0px",
                float: props.flotar || "right"
            }}>
            {props.etiqueta}
        </button>
    );
}

export default botonRelenado;
import React from "react";

import "./estilos/EstiloBotonRellenado.css";

var botonRelenado = (props) => {
    return(
        <button className="btn btn-primary botonRellenado">{props.etiqueta}</button>
    );
}

export default botonRelenado;
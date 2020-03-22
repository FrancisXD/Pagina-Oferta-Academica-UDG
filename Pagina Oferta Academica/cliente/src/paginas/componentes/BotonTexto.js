import React from "react";

import "./estilos/BotonTexto.css";

let boton = (props) => (
    <button
        className="boton"
        onClick={props.onClick}
    >
    {props.etiqueta}
    </button>
);

export default boton;
import React from "react";

import BotonRellenado from "./BotonRellenado";

import "./estilos/SelectorArchivo.css";

let selectorArchivo = (props) => (
    <React.Fragment>
        <input 
            className="selector" 
            type="file" 
            name="archivo" 
            accept=".txt"
            onChange={props.onChange}
        />
        <BotonRellenado 
            etiqueta="ENVIAR" 
            flotar="none"
            onClick={props.onClick}
        />
    </React.Fragment>
);

export default selectorArchivo;
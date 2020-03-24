import React from "react";

import IconoDocumento from "../imagenes/iconoDocumento.png";
import IconoCruz from "../imagenes/iconoX.png";

import "./estilos/VisorArchivo.css";

let visorArchivo = (props) => (
    <div className="cont">
        <img className="imag" src={IconoDocumento} alt="icono documento"/>
        <p className="e">{props.nombreArchivo || "sin archivo"}</p>
        <p className="e">{props.fecha || "dd/mm/aaaa"}</p>
        <img 
            className="imagCruz" 
            src={IconoCruz} 
            alt="icono cruz"
            onClick={props.onClick}
            style={{
                visibility: props.visible || "hidden"
            }}
        />
    </div>
);

export default visorArchivo;
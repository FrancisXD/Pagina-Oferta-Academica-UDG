import React from "react";

import BotonRellenado from "./BotonRellenado";

import IconoUsuario from "../imagenes/iconoUsuario.png";

import "./estilos/FormularioConsultar.css";

let formulario = (props) => (
    <div className="form">
        <img src={IconoUsuario} height="110px" alt="icono usuario"/>
        <p className="tituloFormulario">Bienvenido {props.nombre}</p>
        <br/>
        <input className="cam" type="text" placeholder="materia"/>
        <input className="cam" type="text" placeholder="profesor"/>
        <BotonRellenado etiqueta="CONSULTAR" ancho="90px" display="inline-flex" flotar="none"/>
        <BotonRellenado etiqueta="EXPORTAR" ancho="80px" display="inline-flex" flotar="right"/>
        <div className="contenedorConsulta">{props.consulta}</div>
    </div>
);

export default formulario;
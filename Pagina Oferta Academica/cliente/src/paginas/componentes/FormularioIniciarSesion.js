import React from "react";

import BotonRellenado from "./BotonRellenado";

import "./estilos/FormularioIniciarSesion.css";

var FormularioIniciarSesion = (props) => (
    <div className="contenedorFormulario">
        <div className="formulario">
            <p className="tituloFormulario">Inicar Sesión</p>
            <div className="division"/>
            <input 
                className="campo" 
                type="text" 
                placeholder="usuario"
                name="nombreUsuario"
                onChange={props.onChange}
            />
            <input 
                className="campo" 
                type="password" 
                placeholder="contraseña"
                name="contrasenia"
                onChange={props.onChange}
            />
            <div className="divisionFinal"/>
            <small className="etiquetaRecuperarContrasenia">¿Olvidate tu contraseña?</small>
            <BotonRellenado
                onClick={props.onClick}
                ancho="120px"
                etiqueta="INICIAR SESIÓN"
            />
        </div>
    </div>
);

export default FormularioIniciarSesion;
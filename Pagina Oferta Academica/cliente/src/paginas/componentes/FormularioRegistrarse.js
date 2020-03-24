import React from "react";

import BotoRellenado from "./BotonRellenado";

import "./estilos/FormularioRegistrarse.css";

let formulario = (props) => (
    <div className="contenedor">
        <div className="formulario" >
            <p className="tituloFormulario">Registrarse</p>
            <div className="division"/>
            <input 
                onChange={props.onChange}
                name="codigo"
                className="campo" 
                type="text" 
                placeholder="codigo"
                style={{
                    width: "120px",
                    display: "inline",
                    marginRight: "16px",
                    marginBottom: "0px"
                }}
            />
            <input 
                onChange={props.onChange}
                name="nombre"
                className="campo" 
                type="text" 
                placeholder="nombre"
                style={{
                    width: "265px",
                    display: "inline",
                    marginLeft: "0px",
                    marginBottom: "0px"
                }}
            />
            <input 
                onChange={props.onChange} 
                name="nombreUsuario"
                className="campo" type="text" 
                placeholder="nombre usuario"
            />
            <input 
                onChange={props.onChange} 
                name="contrasenia"
                className="campo" type="text" 
                placeholder="contraseña"
            />
            <input 
                onChange={props.onChange}
                name="correoElectronico" 
                className="campo" 
                type="text" 
                placeholder="correo electronico"/>
            <BotoRellenado
                onClick={props.onClick}
                etiqueta="REGISTRARSE" 
                ancho="100px"
                margenSuperior="73px"
            />
        </div>
    </div>
);

export default formulario;
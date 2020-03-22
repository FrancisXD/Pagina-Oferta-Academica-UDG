import React from "react";

import Logo from "../imagenes/logo.png";

import "./estilos/EstiloBarraNavegacion.css";

let barra = (props) => (
    <nav className="conteiner-fluid barraNavegacion">
            <img 
                className="logo"
                src={Logo}
                alt="logo cucei"
                style={{
                    marginRight: props.margenDerecho
                }}
            />
            {props.boton}
    </nav>
);

export default barra;
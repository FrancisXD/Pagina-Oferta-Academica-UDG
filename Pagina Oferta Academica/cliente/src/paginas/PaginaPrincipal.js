import React from "react";

import BotonContorneado from "./componentes/BotonContorneado";
import BotonRellenado from "./componentes/BotonRellenado";
import PiePagina from "./componentes/PiePagina";

import "./estilos/EstiloPaginaPrincipal.css";
import "./componentes/estilos/EstiloBarraNavegacion.css";

import EdificioUDG from "./imagenes/udg.jpg"
import Logo from "./imagenes/logo.png";

class PaginaPrincipal extends React.Component {
    render() {
        return(
            <div>
                <nav className="navbar navbar-expand-lg barraNavegacion">
                    <img className="logo" src={Logo} alt="logo cucei"/>
                    <BotonContorneado etiqueta="INICIAR SESIÓN"/>
                    <BotonRellenado etiqueta="REGISTRARSE"/>
                </nav>
                <img className="edificioUDG" src={EdificioUDG} alt="edificio UDG"/>
                <PiePagina/>
            </div>
        );
    }
}

export default PaginaPrincipal;
import React from "react";

import BarraNavegacion from "./componentes/BarraNavegacion";
import BotonContorneado from "./componentes/BotonContorneado";
import BotonRellenado from "./componentes/BotonRellenado";
import PiePagina from "./componentes/PiePagina";

import "./estilos/EstiloPaginaPrincipal.css";

import EdificioUDG from "./imagenes/udg.jpg"

class PaginaPrincipal extends React.Component {
    manejadorClickIniciarSesion = e => {
        this.props.history.push("/iniciar_sesion");
    }

    manejadorClickRegistrarse = e => {
        this.props.history.push("/registrarse");
    }

    render() {
        var botones = [<BotonContorneado ancho="150px" onClick={this.manejadorClickIniciarSesion} etiqueta="INICIAR SESIÓN"/>,
                       <BotonRellenado onClick={this.manejadorClickRegistrarse} etiqueta="REGISTRARSE"/>];

        return(
            <React.Fragment>
                <BarraNavegacion margenDerecho="700px" boton={botones}/>
                <img className="edificioUDG" src={EdificioUDG} alt="edificio UDG"/>
                <PiePagina/>
            </React.Fragment>
        );
    }
}

export default PaginaPrincipal;
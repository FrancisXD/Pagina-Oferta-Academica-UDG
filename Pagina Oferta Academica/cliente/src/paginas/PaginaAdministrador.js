import React from "react";

import BotonContorneado from "./componentes/BotonContorneado";
import PiePagina from "./componentes/PiePagina";

import Logo from "./imagenes/logo.png";

import "./componentes/estilos/EstiloBarraNavegacion.css";
import "./estilos/EstiloPaginaAdministrador.css";

class PaginaAdministrador extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <header className="row row-cols-1">
                    <nav className="barraNavegacion">
                        <img className="logo" src={Logo} alt="logo cucei"/>
                        <BotonContorneado etiqueta="CERRAR SESIÓN"/>
                    </nav>
                </header>
                <main className="row row-cols-1">
                    <div className="container-fluid contenedorSubirArchivo">
                        <input type="file"/>
                    </div>    
                </main>
                <footer className="row row-cols-1">
                    <PiePagina/>
                </footer>
            </div>
        );
    }
}

export default PaginaAdministrador;
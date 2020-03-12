import React from "react";
import SocketIOClient from "socket.io-client";

import BotonContorneado from "./componentes/BotonContorneado";
import PiePagina from "./componentes/PiePagina";

import Logo from "./imagenes/logo.png";

import "./componentes/estilos/EstiloBarraNavegacion.css";
import "./estilos/EstiloPaginaAdministrador.css";

class PaginaAdministrador extends React.Component {
    state = {
        archivo: null,
        totalProfesores: 0,
        totalDepartamentos: 0,
        totalMaterias: 0,
        totalEdificios: 0
    }

    componentDidMount() {
        this.socket = SocketIOClient("http://localhost:4000");

        this.socket.on('archivoSubido',(datos)=> {
            this.setState({
                totalProfesores: datos.totalProfesores,
                totalDepartamentos: datos.totalDepartamentos,
                totalMaterias: datos.totalMaterias,
                totalEdificios: datos.totalEdificios
            });
        });
    }

    manejadorCambioDeArchivo=(evento,arch)=> {
        this.setState({
            archivo: evento.target.files[0] || arch
        });
    }

    manejadorClick=()=> {
        setTimeout(()=> {
            this.socket.emit('subirArchivo')
        },2000);
    }

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
                        <form action="http://localhost:4000/subir" method="POST" encType="multipart/form-data" target="_blak" onSubmit={this.manejadorClick.bind(this)}>
                            <input type="file" name="archivo" accept=".txt" onChange={this.manejadorCambioDeArchivo}/>
                            <input type="submit" value="Subir"/>
                        </form>
                        <p>Total profesores: {this.state.totalProfesores}</p>
                        <p>Total departamentos: {this.state.totalDepartamentos}</p>
                        <p>Total materias: {this.state.totalMaterias}</p>
                        <p>Total edificio: {this.state.totalEdificios}</p>
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
import React from "react";
import SocketIOClient from "socket.io-client";

import BotonContorneado from "./componentes/BotonContorneado";
import BotonRellenado from "./componentes/BotonRellenado";
import PiePagina from "./componentes/PiePagina";

import Logo from "./imagenes/logo.png";
import IconoSubirArchivo from "./imagenes/iconoSubirArchivo.png";
import IconoDocumento from "./imagenes/iconoDocumento.png";

import "./componentes/estilos/EstiloBarraNavegacion.css";
import "./estilos/EstiloPaginaAdministrador.css";
import "./componentes/estilos/EstiloBotonContorneado.css";

class PaginaAdministrador extends React.Component {
    state = {
        maxColisionesAVisualizar: 8,
        nombreAdministrador: "Nombre administrador",
        nombreArchivo: "",
        totalProfesores: 0,
        totalDepartamentos: 0,
        totalMaterias: 0,
        totalEdificios: 0,
        colisiones: [],
        colisionesAMostrar: null,
        iColisionInicial: 0,
        mostrarBotonSiguiente: "none",
        mostrarBotonAnterior: "none"
    }

    componentDidMount() {
        this.socket = SocketIOClient("http://localhost:4000");

        this.socket.on('archivoSubido',(datos)=> {
            var colisionesCad = [], i, maxColisionesAMostrar;
            var grupos = datos.colisiones;

            maxColisionesAMostrar = this.state.iColisionInicial+this.state.maxColisionesAVisualizar;
            colisionesCad.push(<div className="row colision">
                                    <p className="col-1 celda">NRC</p>
                                    <p className="col-6 celda">Materia</p>
                                    <p className="col-1 celda">Edificio</p>
                                    <p className="col-1 celda">Aula</p>
                                    <p className="col-1 celda">Dias</p>
                                    <p className="col-1 celda">Inicio</p>
                                    <p className="col-1 celda">Fin</p>
                            </div>);
            for(i = this.state.iColisionInicial;i < maxColisionesAMostrar;i++) {
                colisionesCad.push(<div className="row colision">
                                    <p className="col-1 celda">{grupos[i].nrc}</p>
                                    <p className="col-6 celda">{grupos[i].materia.nombre.substring(0,40)}</p>
                                    <p className="col-1 celda">{grupos[i].horario.edificio}</p>
                                    <p className="col-1 celda">{grupos[i].horario.aula}</p>
                                    <p className="col-1 celda">{grupos[i].horario.dias}</p>
                                    <p className="col-1 celda">{grupos[i].horario.horaInicio}</p>
                                    <p className="col-1 celda">{grupos[i].horario.horaFin}</p>
                                </div>);
            }
            
            this.setState({
                totalProfesores: datos.totalProfesores,
                totalDepartamentos: datos.totalDepartamentos,
                totalMaterias: datos.totalMaterias,
                totalEdificios: datos.totalEdificios,
                colisiones: datos.colisiones,
                colisionesAMostrar: colisionesCad,
                iColisionInicial: i,
                mostrarBotonSiguiente: "inline",
                nombreArchivo: datos.nombreArchivo
            });
        });

        this.socket.on('mensaje',(mensaje)=> {
            alert(mensaje);
        });
    }

    manejadorClick=()=> {
        setTimeout(()=> {
            this.socket.emit('subirArchivo');
        },1000);
    }

    manejadorClickSiguiente = e => {
        var colisionesCad = [], i, maxColisionesAMostrar;
        var grupos = this.state.colisiones;

        maxColisionesAMostrar = this.state.iColisionInicial+this.state.maxColisionesAVisualizar;
        colisionesCad.push(<div className="row colision">
                                    <p className="col-1 celda">NRC</p>
                                    <p className="col-6 celda">Materia</p>
                                    <p className="col-1 celda">Edificio</p>
                                    <p className="col-1 celda">Aula</p>
                                    <p className="col-1 celda">Dias</p>
                                    <p className="col-1 celda">Inicio</p>
                                    <p className="col-1 celda">Fin</p>
                            </div>);
        for(i = this.state.iColisionInicial;i < maxColisionesAMostrar;i++) {
            colisionesCad.push(<div className="row colision">
                                    <p className="col-1 celda">{grupos[i].nrc}</p>
                                    <p className="col-6 celda">{grupos[i].materia.nombre.substring(0,40)}</p>
                                    <p className="col-1 celda">{grupos[i].horario.edificio}</p>
                                    <p className="col-1 celda">{grupos[i].horario.aula}</p>
                                    <p className="col-1 celda">{grupos[i].horario.dias}</p>
                                    <p className="col-1 celda">{grupos[i].horario.horaInicio}</p>
                                    <p className="col-1 celda">{grupos[i].horario.horaFin}</p>
                                </div>);
        }
        
        if(i === this.state.colisiones.length) {
            this.setState({
                colisionesAMostrar: colisionesCad,
                iColisionInicial: i,
                mostrarBotonSiguiente: "none",
                mostrarBotonAnterior: "inline"
            });
        }
        else {
            this.setState({
                colisionesAMostrar: colisionesCad,
                iColisionInicial: i,
                mostrarBotonAnterior: "inline"
            });
        }
    }

    manejadorClickAnterior = e => {
        var colisionesCad = [], i, maxColisionesAMostrar;
        var grupos = this.state.colisiones;

        i = maxColisionesAMostrar = this.state.iColisionInicial-this.state.maxColisionesAVisualizar;
        colisionesCad.push(<div className="row colision">
                                    <p className="col-1 celda">NRC</p>
                                    <p className="col-6 celda">Materia</p>
                                    <p className="col-1 celda">Edificio</p>
                                    <p className="col-1 celda">Aula</p>
                                    <p className="col-1 celda">Dias</p>
                                    <p className="col-1 celda">Inicio</p>
                                    <p className="col-1 celda">Fin</p>
                            </div>);
        for(i = maxColisionesAMostrar-this.state.maxColisionesAVisualizar;i < maxColisionesAMostrar;i++) {
            colisionesCad.push(<div className="row colision">
                                    <p className="col-1 celda">{grupos[i].nrc}</p>
                                    <p className="col-6 celda">{grupos[i].materia.nombre.substring(0,40)}</p>
                                    <p className="col-1 celda">{grupos[i].horario.edificio}</p>
                                    <p className="col-1 celda">{grupos[i].horario.aula}</p>
                                    <p className="col-1 celda">{grupos[i].horario.dias}</p>
                                    <p className="col-1 celda">{grupos[i].horario.horaInicio}</p>
                                    <p className="col-1 celda">{grupos[i].horario.horaFin}</p>
                                </div>);
        }
        
        if(i == this.state.maxColisionesAVisualizar) {
            this.setState({
                colisionesAMostrar: colisionesCad,
                iColisionInicial: i,
                mostrarBotonSiguiente: "inline",
                mostrarBotonAnterior: "none"
            });
        }
        else {
            this.setState({
                colisionesAMostrar: colisionesCad,
                iColisionInicial: i,
                mostrarBotonSiguiente: "inline"
            });
        }
    }

    render() {
        return(
            <div className="container-fluid">
                <nav className="barraNavegacion">
                    <img className="logo" src={Logo} alt="logo cucei"/>
                    <BotonContorneado etiqueta="CERRAR SESIÓN"/>
                </nav>
                
                <main className="container-fluid contenedorSubirArchivo">
                    <div className="row">
                        <div className="col-6">
                            <p className="tituloPagina">Administración</p>    
                        </div>
                        <div className="col-6">
                            <p className="nombreUsuario">{this.state.nombreAdministrador}</p>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <p className="col-12 separacion"></p>
                    </div>
                    
                    <div className="row justify-content-around">
                        <div className="col-4">
                            <p className="descripcion">Arrastrar aqui el archivo para que el 
                                sistema lo organice y este disponible en la 
                                página de consultas</p>
                        </div>
                        <div className="col-7">
                            <p className="datosArchivo">
                                <img src={IconoDocumento}
                                    style={{
                                        maxWidth: "16px",
                                        maxHeight: "16px",
                                        marginRight: "10px"
                                    }}/>
                                {this.state.nombreArchivo}
                                {this.state.fecha}
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-5">
                            <form action="http://localhost:4000/subir" method="POST" encType="multipart/form-data" target="_blak" onSubmit={this.manejadorClick.bind(this)}>
                                <input className="selectorArchivo" type="file" name="archivo" accept=".txt"/>
                                <input type="submit" value="Subir"/>
                            </form>
                        </div>
                        <div className="col-7">
                            <BotonRellenado etiqueta="status"/>
                            <BotonRellenado etiqueta="consultar"/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-4">
                            <p className="total">Total profesores: {this.state.totalProfesores}</p>
                            <p className="total">Total departamentos: {this.state.totalDepartamentos}</p>
                            <p className="total">Total materias: {this.state.totalMaterias}</p>
                            <p className="total">Total edificio: {this.state.totalEdificios}</p>
                        </div>
                        <div className="col-8">
                            <div className="conteiner-fluid">
                                {this.state.colisionesAMostrar}
                            </div>
                            <BotonRellenado etiqueta="siguiente" 
                                display={this.state.mostrarBotonSiguiente} 
                                onClick={this.manejadorClickSiguiente}/>
                            <BotonRellenado etiqueta="anterior" 
                                display={this.state.mostrarBotonAnterior}
                                onClick={this.manejadorClickAnterior}/>
                        </div>
                    </div>                        
                </main>

                <PiePagina/>
            </div>
        );
    }
}

export default PaginaAdministrador;
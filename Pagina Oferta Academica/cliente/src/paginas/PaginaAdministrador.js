import React from "react";

import BarraNavegacion from "./componentes/BarraNavegacion";
import BotonContorneado from "./componentes/BotonContorneado";
import BotonRellenado from "./componentes/BotonRellenado";
import PiePagina from "./componentes/PiePagina";
import VisorArchivo from "./componentes/VisorArchivo";
import SelectorArchivo from "./componentes/SelecionadorArchivo";
import Pagina404 from "./404";

import "./estilos/EstiloPaginaAdministrador.css";

class PaginaAdministrador extends React.Component {
    
    state = {
        nombreUsuario: null,
        archivo: null,
        formulario: null,
        totalProfesores: 0,
        totalDepartamentos: 0,
        totalMaterias: 0,
        totalEdificios: 0,
        colisiones: [],
        nombreArchivo: "",
        verCruzEliminarArchivo: "hidden",
        error: false
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.setState({
                nombreUsuario: this.props.location.state.nombre
            });
            this.inicializarDatosArchivo();
        }
        else{
            this.setState({
                error: true
            });
        }
    }

    inicializarDatosArchivo = async () => {
        var res;

        try {
            await fetch("http://localhost:8000/api/inicializar").then(
                dataWrappedByPromise => dataWrappedByPromise.json()
            ).then(
                data => {
                    res = data;
                }
            );
            
            if(res[0]) {
                this.setState({
                    archivo: res[0],
                    nombreArchivo: res[0].nombre,
                    verCruzEliminarArchivo: "visible"
                });
                this.pedirDatosArchivo();
            }
        }
        catch(err) {
            this.setState({
                error: true
            });
        }
    }

    pedirDatosArchivo = async () => {
        let configuracion;
        var res;

        try {
            configuracion = {
                method: "POST",
                headers: {
                    'accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(this.state.archivo)
            };

            await fetch("http://localhost:8000/api/obtenerDatos", configuracion).then(
                dataWrappedByPromise => dataWrappedByPromise.json()
            ).then(
                data => {
                    res = data;
                }
            );

            this.setState({
                totalProfesores: res.totalProfesores,
                totalDepartamentos: res.totalDepartamentos,
                totalMaterias: res.totalMaterias,
                totalEdificios: res.totalEdificios,
                colisiones: res.colisiones,
            });
        }
        catch(err) {
            this.setState({
                error: true
            });
        }
    }

    cambiarArchivo = e => {
        var formData;

        if(this.state.archivo) {
            alert("ya has subido un archivo");
        }
        else {
            if(e.target.files) {
                formData = new FormData();
                formData.append('archivo', e.target.files[0]);

                this.setState({
                    formulario: formData
                });
            }
            else {
                e.target.files[0].name = "no se elegió archivo";
                alert("no has seleccionado un archivo");
            }
        }
    }

    subirArchivo = async e => {
        let configuracion;
        var res;

        e.preventDefault();
        try {
            if(this.state.formulario) {
                configuracion = {
                    method: "POST",
                    body: this.state.formulario
                };

                await fetch("http://localhost:8000/api/subir", configuracion).then(
                    dataWrappedByPromise => dataWrappedByPromise.json()
                ).then(
                    data => {
                        res = data;
                    }
                );
                console.log("se subio archivo")

                if(res.filasAfectadas === 1) {
                    this.inicializarDatosArchivo();
                }
                else {
                    alert("el archivo no se ha enviado");
                }
            }
            else {
                alert("no se puede subir mas de un archivo a la vez");
            }
        }
        catch(err) {
            this.setState({
                error: true
            });
        }
    }

    verStatus = e => {
        alert("status");
    }

    consultar = e => {
        alert("consultar");
    }

    borrarArchivo = e => {
        alert("eliminar archivo");
    }

    cerrarSesion = e => {
        this.props.history.push("/");
    }

    render() {
        if(this.state.error) {
            return <Pagina404/>
        }
        else {
            var botones = [<BotonContorneado key="1" etiqueta="CERRAR SESIÓN" onClick={this.cerrarSesion}/>];
            return(
                    <React.Fragment>
                        <BarraNavegacion boton={botones} margenDerecho="850px"/>
                        <div className="conten">
                            <div className="row justify-content-around">
                                <p className="col-6 etiqueta">Administración</p>
                                <p className="col-6 etiqueta">{this.state.nombreUsuario}</p>
                            </div>

                            <div className="row"><div className="col-12 separacion"/></div>

                            <div className="row justify-content-around">
                                <p className="col-5 descripcion">
                                    Arrastrar aqui el archivo para que el 
                                    sistema lo organice y este disponible en la 
                                    página de consultas
                                </p>
                                <div className="col-7">
                                    <VisorArchivo 
                                        onClick={this.borrarArchivo}
                                        nombreArchivo={this.state.nombreArchivo}
                                        visible={this.state.verCruzEliminarArchivo}
                                    />
                                </div>
                            </div>

                            <div className="row justify-content-around">
                                <div className="col-5">
                                    <SelectorArchivo
                                        onChange={this.cambiarArchivo}
                                        onClick={this.subirArchivo}
                                    />
                                </div>
                                <div className="col-7">
                                    <p className="total">Total profesores: {this.state.totalProfesores}</p>
                                    <p className="total">Total departamentos: {this.state.totalDepartamentos}</p>
                                    <p className="total">Total materias: {this.state.totalMaterias}</p>
                                    <p className="total">Total edificio: {this.state.totalEdificios}</p>
                                    <p className="total">Total colisiones: {this.state.colisiones.length}</p>
                                    <BotonRellenado
                                        onClick={this.verStatus} 
                                        etiqueta="STATUS" 
                                        flotar="left"
                                    />
                                    <BotonRellenado 
                                        onClick={this.consultar}
                                        etiqueta="CONSULTAR" 
                                        flotar="left"
                                    />
                                </div>
                            </div>
                        </div>
                        <PiePagina/>
                    </React.Fragment>
                );
        }
    }
}

export default PaginaAdministrador;
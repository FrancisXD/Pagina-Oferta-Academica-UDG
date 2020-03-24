import React from "react";

import BarraNavegacion from "./componentes/BarraNavegacion";
import BotonTexto from "./componentes/BotonTexto";
import FormularioIniciarSesion from "./componentes/FormularioIniciarSesion";
import PiePagina from "./componentes/PiePagina";

class PaginaIniciarSesion extends React.Component {

    state = {
        usuario: null,
        error: false
    }

    manejadorCambio = e => {
        this.setState({
            usuario: {
                ...this.state.usuario,
                [e.target.name]: e.target.value
            }
        });
    }

    manejadorClick = e => {
        this.props.history.push("/");
    }

    manejadorMandarFormulario = async e => {
        let configuracion;
        var res, formulario;

        e.preventDefault();
        try {
            formulario = new FormData();
            formulario.append('usuario', this.state.usuario);
            
            configuracion = {
                method: "POST",
                headers: {
                    'accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(this.state.usuario)
            };

            await fetch("http://localhost:8000/api/iniciar", configuracion).then(
                dataWrappedByPromise => dataWrappedByPromise.json()
            ).then(
                data => {
                    res = data;
                }
            );
            this.procesarRespuesta(res);
        }
        catch(err) {
            this.setState({
                error: true
            });
        }
    }

    procesarRespuesta(res) {
        if(res.length === 0) {
            alert("Usuario o Contraseña no válida");
        }
        else {
            this.setState({
                usuario: res[0]
            });
            if(this.state.usuario.tipo_usuario === "consultor") {
                this.props.history.push({
                    pathname: "/consultor",
                    state: {
                        nombre: this.state.usuario.nombre
                    } 
                });
            }
            else {
                this.props.history.push({
                    pathname: "/administrador",
                    state: {
                        nombre: this.state.usuario.nombre
                    } 
                });
            }
        }
    }

    render() {
        var boton = [<BotonTexto
                        key="1"
                        etiqueta="INICIO"
                        onClick={this.manejadorClick}
                    />]

        return(
            <React.Fragment>
                <BarraNavegacion margenDerecho="900px" boton={boton}/>
                <FormularioIniciarSesion
                    onChange={this.manejadorCambio}
                    onClick={this.manejadorMandarFormulario}
                />
                <PiePagina/>
            </React.Fragment>
        );
    }
}

export default PaginaIniciarSesion;
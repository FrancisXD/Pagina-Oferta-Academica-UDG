import React from "react";

import BarraNavegacion from "./componentes/BarraNavegacion";
import BotonTexto from "./componentes/BotonTexto";
import FormularioIniciarSesion from "./componentes/FormularioIniciarSesion";
import PiePagina from "./componentes/PiePagina";

class PaginaIniciarSesion extends React.Component {

    state = {
        usuario: {
            nombreUsuario: "",
            contrasenia: "",
        },
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
        var res, respuesta;

        e.preventDefault();
        try {
            configuracion = {
                method: "POST",
                headers: {
                    'accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(this.state.usuario)
            };

            res = await fetch("http://localhost:8000/api/iniciar", configuracion);
            respuesta = res.json();
            console.log(respuesta);
        }
        catch(err) {
            this.setState({
                error: true
            });
            console.log("error");
        }
    }

    render() {
        var boton = <BotonTexto
                        etiqueta="INICIO"
                        onClick={this.manejadorClick}
                    />

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
import React from "react";

import BarraNavegacion from "./componentes/BarraNavegacion";
import BotonTexto from "./componentes/BotonTexto";
import FormularioRegistrarse from "./componentes/FormularioRegistrarse";
import PiePagina from "./componentes/PiePagina";

class PaginaRegistrarse extends React.Component {
    state = {
        usuario: {
            codigo: 0,
            nombre: "",
            nombreUsuario: "",
            contrasenia: "",
            correoElectronico: ""
        }
    }

    manejadorClick = e => {
        this.props.history.push("/");
    }

    manejadorCambioInfo = e => {
        this.setState({
            usuario: {
                ...this.state.usuario,
                [e.target.name]: e.target.value
            }
        })
    }

    manejadorSubmit = async e => {
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

            res = await fetch("http://localhost:8000/api/registrarse", configuracion);
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
                <FormularioRegistrarse
                    onClick={this.manejadorSubmit}
                    onChange={this.manejadorCambioInfo}
                />
                <PiePagina/>
            </React.Fragment>
        );
    }
}

export default PaginaRegistrarse;
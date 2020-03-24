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
        var res;

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

            await fetch("http://localhost:8000/api/registrarse", configuracion).then(
                dataWrappedByPromise => dataWrappedByPromise.json()
                ).then(
                    data => {
                        res = data;
                    }
                );
            if(res.error) {
                alert("nombre se usuario ya utilizado");
            }
            else {
                if(res.filasAfectadas === 1) {
                    alert("Su registro a sido guardado correctamente");
                    this.inicializarEstado();
                }
                else {
                    alert("Se crearon mas registros");
                }
            }
        }
        catch(err) {
            this.setState({
                error: true
            });
        }
    }

    inicializarEstado() {
        this.setState({
            usuario: {
                codigo: 0,
                nombre: "",
                nombreUsuario: "",
                contrasenia: "",
                correoElectronico: ""
            } 
        });
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
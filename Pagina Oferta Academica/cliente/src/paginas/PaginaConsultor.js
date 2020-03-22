import React from "react";

import BarraNavegacion from "./componentes/BarraNavegacion";
import BotonContorneado from "./componentes/BotonContorneado";
import FormularioConsultar from "./componentes/FormularioConsultar";
import PiePagina from "./componentes/PiePagina";

class PaginaConsultor extends React.Component {
    state = {
        nombreUsuario: "Alumno",
        consulta: []
    }

    cerrarSesion = e => {
        this.props.history.push("/");
    }

    exportarPDF = e => {

    }

    consultar = async e => {

    }

    render() {
        var boton = <BotonContorneado 
                        onClick={this.cerrarSesion}
                        etiqueta="CERRAR SESIÓN" 
                        ancho="150px"
                    />

        return(
            <React.Fragment>
                <BarraNavegacion 
                    margenDerecho="840px" 
                    boton={boton}
                />
                <FormularioConsultar
                    nombre={this.state.nombreUsuario}
                    consulta={this.state.consulta}
                />
                <PiePagina/>
            </React.Fragment>
        );
    }
}

export default PaginaConsultor;
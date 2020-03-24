import React from "react";

import BarraNavegacion from "./componentes/BarraNavegacion";
import BotonContorneado from "./componentes/BotonContorneado";
import FormularioConsultar from "./componentes/FormularioConsultar";
import PiePagina from "./componentes/PiePagina";
import Pagina404 from "./404";

class PaginaConsultor extends React.Component {
    state = {
        nombreUsuario: null,
        consulta: [],
        error: false
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.setState({
                nombreUsuario: this.props.location.state.nombre
            });
        }
        else{
            this.setState({
                error: true
            });
        }
    }

    cerrarSesion = e => {
        this.props.history.push("/");
    }

    exportarPDF = e => {

    }

    consultar = async e => {

    }

    render() {
        if(this.state.error) {
            return <Pagina404/>
        }
        else {
            var boton = [<BotonContorneado 
                            key="1"
                            onClick={this.cerrarSesion}
                            etiqueta="CERRAR SESIÓN" 
                            ancho="150px"
                        />]
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
}

export default PaginaConsultor;
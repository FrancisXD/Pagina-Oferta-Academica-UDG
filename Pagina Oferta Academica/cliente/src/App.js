import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PaginaPrincipal from "./paginas/PaginaPrincipal";
import PaginaAdministrador from "./paginas/PaginaAdministrador";
import PaginaConsultor from "./paginas/PaginaConsultor";
import PaginaInicarSesion from "./paginas/PaginaIniciarSesion";
import PaginaRegistrarse from "./paginas/PaginaRegistrarse";

let app = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={PaginaPrincipal}/>
            <Route exact path="/iniciar_sesion" component={PaginaInicarSesion}/>
            <Route exact path="/registrarse" component={PaginaRegistrarse}/>
            <Route exact path="/consultor" component={PaginaConsultor}/>
            <Route exact path="/administrador" component={PaginaAdministrador}/>
        </Switch>
    </BrowserRouter>
);

export default app;
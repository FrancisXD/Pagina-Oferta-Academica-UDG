import React from "react"

import ImagenError404 from "./imagenes/404.png";

let pagina404 = () => (
    <React.Fragment>
        <img 
            src={ImagenError404} 
            alt="error 404"
        />
    </React.Fragment>
);

export default pagina404;
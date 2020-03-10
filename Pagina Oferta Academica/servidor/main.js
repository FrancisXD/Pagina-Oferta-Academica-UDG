var express = require("express");
var color = require("colors");
var administradorArchivo = require("./AdministradorMaterias");

const PUERTO = 3000;
const NOM_ARCHIVO = "./Oferta_2016_Mod2.txt";

var servidor = express();

servidor.get("/",(solicitud,respuesta) => {
    administradorArchivo.fijaNombreArchivo(NOM_ARCHIVO);
    administradorArchivo.leerGrupos();

    respuesta.send(administradorArchivo.dameColisiones());
});

servidor.listen(PUERTO,() => {
    console.log("Servidor iniciado en el puerto: ".green,PUERTO);
})
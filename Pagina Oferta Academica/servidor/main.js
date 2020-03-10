var express = require("express");
var formidable = require("formidable");
var color = require("colors");
var administradorArchivo = require("./AdministradorMaterias");

const PUERTO = 4000;
//const NOM_ARCHIVO = "./Oferta_2016_Mod2.txt";

var servidor = express();

/*
administradorArchivo.fijaNombreArchivo(NOM_ARCHIVO);
administradorArchivo.leerGrupos();
console.log("Total profesores: "+administradorArchivo.dameTotalProfesores());
console.log("Total materias: "+administradorArchivo.dameTotalMaterias());
console.log("Total departamentos: "+administradorArchivo.dameTotalDepartamentos());
console.log(administradorArchivo.dameColisiones());
var colisiones = administradorArchivo.dameColisiones();
var grupos = administradorArchivo.dameGrupos();
for(var i = 14;i < colisiones.length;i++) {
    for(var j = 0;j < colisiones[j].length;j++) {
        console.log(grupos[colisiones[i][j]]);
    }
}
*/

servidor.get("/",(solicitud,respuesta) => {
    respuesta.send("Hola");
});

servidor.post("/subir",(solicitud,respuesta) => {
    let form = formidable.IncomingForm();

    form.on("fileBegin",(nombre,archivo) => {
        archivo.path = "./archivos"+archivo.name;
    });
    form.on("file",(nombre,file) => {
        administradorArchivo.fijaNombreArchivo(archivo.path);
        administradorArchivo.leerGrupos();
        respuesta.send(administradorArchivo.dameColisiones());
    });
});

servidor.listen(PUERTO,() => {
    console.log("Servidor iniciado en el puerto:".green,PUERTO);
})

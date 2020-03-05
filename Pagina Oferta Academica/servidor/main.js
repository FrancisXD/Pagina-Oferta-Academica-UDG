var administradorArchivo = require("./AdministradorMaterias");

const NOM_ARCHIVO = "./Oferta_2016_Mod2.txt";

administradorArchivo.fijaNombreArchivo(NOM_ARCHIVO);
console.log(administradorArchivo.leerGrupos());
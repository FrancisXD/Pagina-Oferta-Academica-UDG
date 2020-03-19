var BaseDatos = require("./ConectorBDA");
var SistemaArchivo = require("fs");

var AdministradorGruposDAO = class AdministradorGruposDAO {
    constructor() {
        this.basedatos = new BaseDatos("root","1234","Oferta_Academica");
    }

    obtenerArchivo() {
        this.basedatos.ejecutarInstruccion("SELECT * FROM archivo");
    }

    guardarArchivo(nombre,rutaArchivo) {
        var instruccion;

        instruccion = "INSERT INTO archivo(nombre,ruta) VALUES('"+nombre+"','"+rutaArchivo+"')";
        return this.basedatos.ejecutarInstruccion(instruccion);
    }

    dameRutaArchivo() {
        return this.basedatos.dameResultado(); 
    }

    eliminarArchivo(socket) {
        var instruccion = "DELETE FROM archivo";
        this.basedatos.ejecutarInstruccion(instruccion,socket);
    }
};

module.exports = AdministradorGruposDAO;
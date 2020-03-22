var BaseDatos = require("./ConectorBDA");
var Usuario = require('./Usuario');
var SistemaArchivo = require("fs");

var AdministradorGruposDAO = class AdministradorGruposDAO {
    constructor() {
        this.basedatos = new BaseDatos("root","1234","Oferta_Academica");
    }

    static comprobarUsuario(usuario, contrasenia) {
        var usuario, instruccion;

        usuario = new Usuario(usuario, contrasenia);
        instruccion = "SELECT * FROM usuario "+
            "WHERE nombre_usuario='"+usuario+"' AND contrasenia='"+contrasenia+"'";
    }

    obtenerArchivo(res) {
        var cosulta = "SELECT * FROM archivo";
        this.basedatos.ejecutarInstruccion(res, cosulta);
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
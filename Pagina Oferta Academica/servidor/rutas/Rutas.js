var Express = require('express');
var FormidableMiddleware = require('express-formidable');
var SistemaArchivo = require('file-system');
var ConectorBDA = require('../ConectorBDA');
var AdministradorArchivo = require('../AdministradorMaterias');


var ruta = new Express();
var conectorBDA =  new ConectorBDA("root", "1234", "Oferta_Academica");

const TIPO_USUARIO_CONSULTOR = "consultor";

ruta.get('/inicializar', (req, res) => {
    var consulta;

    consulta = "SELECT * FROM archivo";
    conectorBDA.ejecutarInstruccion(res, consulta);
});

ruta.post('/iniciar', (req, res) => {
    var usuario, contrasenia, consulta;

    console.log("aqui");
    usuario = req.body.nombreUsuario;
    contrasenia = req.body.contrasenia;
    consulta = "SELECT * FROM usuario "+
        "WHERE nombre_usuario='"+usuario+"' AND contrasenia='"+contrasenia+"'";
    conectorBDA.ejecutarInstruccion(res, consulta);
});

ruta.post('/registrarse', (req, res) => {
    var codigo, nombre, nombreUsuario, contrasenia, correoElectronico, instruccion;

    codigo = req.body.codigo;
    nombre = req.body.nombre;
    nombreUsuario = req.body.nombreUsuario;
    contrasenia = req.body.contrasenia;
    correoElectronico = req.body.correoElectronico;
    
    instruccion = "INSERT INTO "+
                  "usuario(codigo,nombre,correo_electronico,nombre_usuario,contrasenia,tipo_usuario) "+
                  "VALUES("+codigo+",'"+nombre+"','"+correoElectronico+"','"+nombreUsuario+"','"+contrasenia+"','"+
                  TIPO_USUARIO_CONSULTOR+"')";
    
    conectorBDA.ejecutar(res, instruccion);
});

ruta.post('/subir', FormidableMiddleware(), async (req, res) => {
    var tempRuta, ruta, nombre, instruccion;

    nombre = req.files.archivo.name;
    tempRuta = req.files.archivo.path;
    ruta = "./archivos/"+nombre;

    SistemaArchivo.copyFileSync(tempRuta, ruta);

    instruccion = "INSERT INTO "+
                  "archivo(nombre,ruta) "+
                  "VALUES('"+nombre+"','"+ruta+"')";

    conectorBDA.ejecutar(res, instruccion);
});

ruta.post('/obtenerDatos', (req, res) => {
    AdministradorArchivo.fijaNombreArchivo(req.body.ruta);
    AdministradorArchivo.leerGrupos();

    res.json({
        totalProfesores: AdministradorArchivo.dameTotalProfesores(),
        totalDepartamentos: AdministradorArchivo.dameTotalDepartamentos(),
        totalMaterias: AdministradorArchivo.dameTotalMaterias(),
        totalEdificios: AdministradorArchivo.dameTotalEdificios(),
        colisiones: AdministradorArchivo.obtenerColisiones()
    })
});

ruta.post('/consultar', (req, res) => {
    var profesor, materia;
});

module.exports = ruta;
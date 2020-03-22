var Express = require('express');
var ConectorBDA = require('../ConectorBDA');

var ruta = new Express();
var conectorBDA =  new ConectorBDA("root", "1234", "Oferta_Academica");

ruta.post('/iniciar', (req, res) => {
    var usuario, contrasenia, consulta;

    usuario = req.body.nombreUsuario;
    contrasenia = req.body.contrasenia;
    consulta = "SELECT * FROM usuario "+
        "WHERE nombre_usuario='"+usuario+"' AND contrasenia='"+contrasenia+"'";
    conectorBDA.ejecutarInstruccion(res, consulta);
});

module.exports = ruta;
var sistemaArchivo = require("fs");

var AdministradorArchivo = {};

function leerArchivo(nombreArchivo) {
    sistemaArchivo.readFile(nombreArchivo,"utf8",(error,buffer) => {
        var posInicial, posFinal, bufferCad;

        posInicial = posFinal = 0;
        posFinal = buffer.indexOf('\n',posInicial);
        posInicial = posFinal+1;
        posFinal = buffer.indexOf('\n',posInicial);
        posInicial = posFinal+1;
        posFinal = buffer.indexOf('\n',posInicial);
        
        console.log(buffer.substr(posInicial,posFinal));
    });
}

AdministradorArchivo.leerArchivo = leerArchivo;

module.exports = AdministradorArchivo;
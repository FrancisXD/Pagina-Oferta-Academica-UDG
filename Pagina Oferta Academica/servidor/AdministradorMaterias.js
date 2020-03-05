var sistemaArchivo = require("fs");
var Grupo = require("./Grupo");
var Horario = require("./Horario");

const MAX_DIAS_CLASE = 6;
const EOF = -1;

var AdministradorArchivo = {
    nombreArchivo: "",
    grupos: [],
    maxProfesores: 0 
};

function fijaNombreArchivo(nombreArchivo) {
    AdministradorArchivo.nombreArchivo = nombreArchivo;
}

function dameNombreArchivo() {
    return AdministradorArchivo.nombreArchivo;
}

function leerGrupos() {
    var buffer = sistemaArchivo.readFileSync(AdministradorArchivo.nombreArchivo,"UTF-8");
        var posInicialBuffer, posFinalBuffer, posInicio, posFinal, registroGrupo;
        var profesores = [];

        posInicialBuffer = posFinalBuffer = 0;
        posFinalBuffer = buffer.indexOf('\n',posInicialBuffer);
        posInicialBuffer = posFinalBuffer+1;
        posFinalBuffer = buffer.indexOf('\n',posInicialBuffer);

        while(posFinalBuffer != EOF) {
            posInicialBuffer = posFinalBuffer+1;
            posFinalBuffer = buffer.indexOf('\n',posInicialBuffer);
            registroGrupo = buffer.substring(posInicialBuffer,posFinalBuffer);

            var grupo = new Grupo();
            var horario =  new Horario();

            posInicio = 0;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.nrc = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.status = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.departamento = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.area = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.clave = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.materia = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.horaTeoria = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.horaLaboratorio = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.seccion = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.credito = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.cupo = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.ocupado = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.disponible = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;

            posFinal = registroGrupo.indexOf(',',posInicio);
            horario.inicio = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            horario.fin = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posInicio = encontrarDiaHorario(horario,registroGrupo,posInicio);
            posFinal = registroGrupo.indexOf(',',posInicio);
            horario.edificio = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            horario.aula = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+2;
            posFinal = registroGrupo.indexOf('"',posInicio);
            horario.profesor = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            grupo.horario = horario;

            posFinal = registroGrupo.indexOf(',',posInicio);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.fechaInicio = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(',',posInicio);
            grupo.fechaFin = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            grupo.nivel = registroGrupo.substring(posInicio,registroGrupo.length-1);

            if(profesores.indexOf(horario.profesor) == -1) {
                profesores.push(horario.profesor)
            }
        }
    AdministradorArchivo.maxProfesores = profesores.length;
    return AdministradorArchivo.maxProfesores;
}

function encontrarDiaHorario(horario,registroGrupo,posInicial) {
    var posFinal, dia;

    horario.dias = new Array();
    for(var i = 0;i < MAX_DIAS_CLASE;i++) {
        posFinal = registroGrupo.indexOf(',',posInicial);
        dia = registroGrupo.substring(posInicial,posFinal);
        posInicial = posFinal+1;
        if(dia != "") {
            horario.dias.push(dia);
        }
    }
    return posInicial;
}

AdministradorArchivo.leerGrupos = leerGrupos;
AdministradorArchivo.dameNombreArchivo = dameNombreArchivo;
AdministradorArchivo.fijaNombreArchivo = fijaNombreArchivo;
AdministradorArchivo.encontrarDiaHorario = encontrarDiaHorario;

module.exports = AdministradorArchivo;
var sistemaArchivo = require("fs");
var Materia = require("./Materia");
var Grupo = require("./Grupo");
var Horario = require("./Horario");
var Profesor = require("./Profesor");
var QuickSort = require("./QuickSort");

const HORA_NULA = "0000";
const MAX_DIAS_CLASE = 6;
const EOF = -1;
const SEPARADOR_REGISTRO = '\n';
const SEPARADOR_CAMPO = ',';
const SIMBOLO_CADENA = '"';

var AdministradorArchivo = {
    nombreArchivo: "",
    materias: [],
    grupos: [],
    profesores: [],
    departamentos: [],
    edificios: [],
    indicesColisiones: [],
    colisiones: []
};

function fijaNombreArchivo(nombreArchivo) {
    AdministradorArchivo = {
        nombreArchivo: nombreArchivo,
        materias: [],
        grupos: [],
        profesores: [],
        departamentos: [],
        edificios: [],
        indicesColisiones: [],
        colisiones: []
    };
}

function dameNombreArchivo() {
    return AdministradorArchivo.nombreArchivo;
}

function dameTotalProfesores() {
    return AdministradorArchivo.profesores.length;
}

function dameTotalMaterias() {
    return AdministradorArchivo.materias.length;
}

function dameTotalDepartamentos() {
    return AdministradorArchivo.departamentos.length;
}

function dameTotalEdificios() {
    return AdministradorArchivo.edificios.length;
}

function obtenerColisiones() {
    var i, j, iColision;

    var grupos = AdministradorArchivo.grupos;
    var indicesColisiones = AdministradorArchivo.indicesColisiones;
    for(i = 0;i < indicesColisiones.length;i++) {
        for(j = 0;j < indicesColisiones[i].length;j++) {
            iColision = indicesColisiones[i][j];
            AdministradorArchivo.colisiones.push(grupos[iColision]);
        }
    }
    return AdministradorArchivo.colisiones;
}

function dameGrupos() {
    return AdministradorArchivo.grupos;
}

function leerGrupos() {
    var buffer, posInicialBuffer, posFinalBuffer, posInicio, posFinal, registroGrupo;
    var grupo, horario, buscarRegistros = true;

    buffer = sistemaArchivo.readFileSync(AdministradorArchivo.nombreArchivo,"UTF-8");
    posInicialBuffer = posFinalBuffer = 0;
    posFinalBuffer = buffer.indexOf(SEPARADOR_REGISTRO,posInicialBuffer);
    posInicialBuffer = posFinalBuffer+1;
    posFinalBuffer = buffer.indexOf(SEPARADOR_REGISTRO,posInicialBuffer);
    while(buscarRegistros) {
        posInicialBuffer = posFinalBuffer+1;
        posFinalBuffer = buffer.indexOf(SEPARADOR_REGISTRO,posInicialBuffer);
        registroGrupo = buffer.substring(posInicialBuffer,posFinalBuffer);
        if(posFinalBuffer != EOF) {
            materia = new Materia();
            grupo = new Grupo();
            horario =  new Horario();

            posInicio = 0;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            grupo.nrc = registroGrupo.substring(posInicio,posFinal).trim();
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.status = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.departamento = registroGrupo.substring(posInicio,posFinal).trim();
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.area = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.clave = registroGrupo.substring(posInicio,posFinal).trim();
            posInicio = posFinal+1;
            posFinal = obtenerValorCadena(registroGrupo,posInicio,materia);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.horaTeoria = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.horaLaboratorio = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            grupo.seccion = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.creditos = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            grupo.cupo = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            grupo.ocupado = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            grupo.disponible = parseInt(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;

            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            horario.horaInicio = completarHora(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            horario.horaFin = completarHora(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            posInicio = encontrarDiaHorario(horario,registroGrupo,posInicio);
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            horario.edificio = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            horario.aula = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+2;
            posFinal = registroGrupo.indexOf('"',posInicio);
            grupo.profesor = construirProfesor(registroGrupo.substring(posInicio,posFinal));
            posInicio = posFinal+1;
            grupo.horario = horario;

            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.fechaInicio = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
            materia.fechaFin = registroGrupo.substring(posInicio,posFinal);
            posInicio = posFinal+1;
            materia.nivel = registroGrupo.substring(posInicio,registroGrupo.length).replace("\r","");
            grupo.materia = materia;

            guardarGrupo(grupo);
            guardarMateria(materia);
            guardarDepartmento(materia);
            guardarEdificio(horario.edificio);
        }
        else {
            buscarRegistros = false;
        }
    }
    QuickSort.ordenar(AdministradorArchivo.grupos,0,AdministradorArchivo.grupos.length-1);
    buscarColisiones();
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

function construirProfesor(registroProfesor) {
    var posInicial, posFinal;
    var nombreProfesor, codigoProfesor;
    var profesor;

    posFinal = registroProfesor.indexOf('(',posInicial);
    nombreProfesor = registroProfesor.substring(posInicial,posFinal).trim();
    posInicial = posFinal+1;
    posFinal = registroProfesor.indexOf(')',posInicial);
    codigoProfesor = registroProfesor.substring(posInicial,posFinal);

    profesor = new Profesor();
    profesor.nombre = nombreProfesor;
    profesor.codigo = codigoProfesor;

    if(AdministradorArchivo.profesores.indexOf(profesor.nombre) == -1) {
        if(profesor.nombre != ",") {
            AdministradorArchivo.profesores.push(profesor.nombre);
        }
    }
    return profesor;
}

function obtenerValorCadena(registroGrupo,posInicio,materia) {
    var posFinal;

    if(registroGrupo[posInicio] == SIMBOLO_CADENA) {
        posInicio = posInicio + 1;
        posFinal = registroGrupo.indexOf(SIMBOLO_CADENA,posInicio);
        materia.nombre = registroGrupo.substring(posInicio,posFinal);
        return posFinal+2;
    }
    else {
        posFinal = registroGrupo.indexOf(SEPARADOR_CAMPO,posInicio);
        materia.nombre = registroGrupo.substring(posInicio,posFinal);
        return posFinal+1;
    }
}

function completarHora(hora) {
    const MAX_TAM_HORA = 4;
    var caracteresFaltantes;
    var horaNueva = "0";

    if(hora.length == MAX_TAM_HORA) {
        return hora;
    }
    else {
        caracteresFaltantes = (MAX_TAM_HORA-hora.length)-1;
        for(var i = 0;i < caracteresFaltantes;i++)  {
            horaNueva = horaNueva.concat("0");
        }
        horaNueva = horaNueva.concat(hora);
        return horaNueva;
    }
}

function guardarGrupo(grupo) {
    if(grupo) {
        if(AdministradorArchivo.grupos.indexOf(grupo) == -1) {
            AdministradorArchivo.grupos.push(grupo);
        }
    }
}

function guardarMateria(materia) {
    if(materia.nombre != "") {
        if(AdministradorArchivo.materias.indexOf(materia.nombre) == -1) {
            AdministradorArchivo.materias.push(materia.nombre);
        }
    }
}

function guardarDepartmento(materia) {
    if(materia.departamento != "") {
        if(AdministradorArchivo.departamentos.indexOf(materia.departamento) == -1) {
            AdministradorArchivo.departamentos.push(materia.departamento);
        }
    }
}

function guardarEdificio(edificio) {
    if(edificio != "") {
        if(AdministradorArchivo.edificios.indexOf(edificio) == -1) {
            AdministradorArchivo.edificios.push(edificio);
        }
    }
}

function buscarColisiones() {
    var grupos, horaInicio, i, j, horarioAct, horario, totalGrupos;
    var horasInicio, cuentaHorasInicio;

    grupos = AdministradorArchivo.grupos;
    totalGrupos = grupos.length-1;
    horasInicio = [];
    cuentaHorasInicio = -1;

    i = 0;
    while(i < totalGrupos) {
        horarioAct = grupos[i].horario;
        horaInicio = horarioAct.horaInicio;
        if(horaInicio != HORA_NULA) {
            if(horasInicio.indexOf(horaInicio) == -1) {
                cuentaHorasInicio++;
                horasInicio.push(horaInicio);
                AdministradorArchivo.indicesColisiones.push([]);
            }
            j = i+1;
            horario = grupos[j].horario;
            while(sonIgualesHoraInicio(horarioAct.horaInicio,horario.horaInicio)) {
                if(!tieneDatoshorarioVacios(horarioAct) && !tieneDatoshorarioVacios(horario)) {
                    if(sonIguales(horarioAct,horario)) {
                        if(!sonGruposIguales(grupos[i], grupos[j])) {
                            if(AdministradorArchivo.indicesColisiones[cuentaHorasInicio].indexOf(i) == -1) {
                                AdministradorArchivo.indicesColisiones[cuentaHorasInicio].push(i);
                            }
                            if(AdministradorArchivo.indicesColisiones[cuentaHorasInicio].indexOf(j) == -1) {
                                AdministradorArchivo.indicesColisiones[cuentaHorasInicio].push(j);
                            }
                        }
                    }
                }
                if(j < totalGrupos) {
                    horario = grupos[++j].horario;
                }
                else {
                    break;
                }
            }
            i++;
        }
        else {
            i++;
        }
    }
}

function tieneDatoshorarioVacios(horario) {
    if(horario.edificio !== "") {
        if(horario.aula !== "") {
            if(horario.dias.length > 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function sonIguales(horarioUno,horarioDos) {
    var totalDias;
    var horariosIguales;

    if(horarioUno.edificio == horarioDos.edificio) {
        if(horarioUno.aula == horarioDos.aula) {
            if(horarioUno.dias.length < horarioDos.dias.length) {
                totalDias = horarioUno.dias.length;
            }
            else {
                totalDias = horarioDos.dias.length;
            }
            horariosIguales = false;
            for(var i = 0;i < totalDias;i++) {
                if(horarioUno.dias[i] == horarioDos.dias[i]) {
                    horariosIguales = true;
                }
            }
        }
        else {
            horariosIguales = false;
        }
    }
    else {
        horariosIguales = false;
    }
    return horariosIguales;
}

function sonIgualesHoraInicio(horaUno,horaDos) {
    if(horaUno !== "" && horaDos !== "") {
        if(horaUno === horaDos) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function sonGruposIguales(grupoUno,grupoDos) {
    if(grupoUno.nrc === grupoDos.nrc) {
        if(grupoUno.materia.nombre === grupoDos.materia.nombre) {
            return true;
        }
    }
    return false;
}

AdministradorArchivo.leerGrupos = leerGrupos;
AdministradorArchivo.dameNombreArchivo = dameNombreArchivo;
AdministradorArchivo.fijaNombreArchivo = fijaNombreArchivo;
AdministradorArchivo.dameTotalProfesores = dameTotalProfesores;
AdministradorArchivo.dameTotalMaterias = dameTotalMaterias;
AdministradorArchivo.dameTotalDepartamentos = dameTotalDepartamentos;
AdministradorArchivo.dameTotalEdificios = dameTotalEdificios;
AdministradorArchivo.obtenerColisiones = obtenerColisiones;
AdministradorArchivo.dameGrupos = dameGrupos;

module.exports = AdministradorArchivo;
var MySQL = require("mysql");

var ConectorBDA = class ConectorBDA {
    constructor(usu,cont,bda) {
        this.usuario = usu;
        this.contrasenia = cont;
        this.basedatos = bda;
        this.conexion = null;
        this.resultado = null;
    }

    ejecutarInstruccion(consulta) {
        this.conexion = MySQL.createConnection({
            host: "localhost",
            user: this.usuario,
            password: this.contrasenia,
            database: this.basedatos
        });

        if(this.conexion) {
            this.conexion.connect();
            this.conexion.query(consulta,(err, res) => {
                this.resultado = res;
            });
            this.conexion.end();
        }
        else {
            this.resultado = null;
        }
    }

    ejecutarYMandarMensaje(instruccion,socket) {
        this.conexion = MySQL.createConnection({
            host: "localhost",
            user: this.usuario,
            password: this.contrasenia,
            database: this.basedatos
        });

        if(this.conexion) {
            this.conexion.connect();
            this.conexion.query(consulta,(err, res) => {
                this.resultado = res;
            });
            this.conexion.end();
        }
        else {
        }
    }

    dameResultado() {
        return this.resultado;
    }
};

module.exports = ConectorBDA;
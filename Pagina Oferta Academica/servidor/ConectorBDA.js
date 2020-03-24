var MySQL = require("mysql");

let conectorBDA = class ConectorBDA {
    constructor(usu,cont,bda) {
        this.usuario = usu;
        this.contrasenia = cont;
        this.basedatos = bda;
        this.conexion = null;
    }

    ejecutarInstruccion(res, consulta) {
        this.conexion = MySQL.createConnection({
            host: "localhost",
            user: this.usuario,
            password: this.contrasenia,
            database: this.basedatos
        });
        if(this.conexion) {
            this.conexion.connect();
            this.conexion.query(consulta, (err, cojuntoConsulta) => {
                if(err) {
                    res.status(500).json({
                        error: err.message
                    });
                }
                else {
                    res.json(cojuntoConsulta);
                }
            });
            this.conexion.end();
        }
        else {
            res.status(500).json({
                error: "no se pudo conectar a la base de datos"
            });
        }
    }

    ejecutar(res, instruccion) {
        this.conexion = MySQL.createConnection({
            host: "localhost",
            user: this.usuario,
            password: this.contrasenia,
            database: this.basedatos
        });

        if(this.conexion) {
            this.conexion.connect();
            this.conexion.query(instruccion, (err, resultado) => {
                if(err) {
                    res.status(500).json({
                        error: err.message
                    });
                }
                else {
                    res.json({
                        filasAfectadas: resultado.affectedRows
                    });
                }
            });
            this.conexion.end();
        }
        else {
            res.status(500).json({
                error: "no se pudo conectar a la base de datos"
            });
        }
    }
};

module.exports = conectorBDA;

let Usuario = class Usuario {
    constructor(nomUsu, contra, nom, cod, correo) {
        this.nombreUsuario = nomUsu;
        this.contrasenia = contra;
        this.nombre = nom;
        this.codigo = cod;
        this.correoElectronico = correo;
    }

    static dameNombre() {
        return this.nombre;
    }
}

module.exports = Usuario;
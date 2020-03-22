/*var Color = require("colors");
var HTTP = require("http");
var bodyParser = require("body-parser");
var Express = require("express");
var SocketIO = require("socket.io");
var FileUpload = require("express-fileupload");
var administradorArchivo = require("./AdministradorMaterias");
var DAO = require("./AdministradorMateriasDAO");

var ConectorBDA = require('./ConectorBDA');

var hayArchivo;
var nombreArchivo;
var rutaArchivo;
var archivo;
var puerto;

var conectorBDA =  new ConectorBDA("root", "1234", "Oferta_Academica");

var dao = new DAO();
var app = Express();
var servidor = HTTP.createServer(app);
var receptor = SocketIO(servidor,{
    serveClient: true
});

app.set("PUERTO",process.env.PORT || 4000);

app.use(FileUpload());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

servidor.listen((puerto = app.get("PUERTO")),() => {
    var res;

    dao.obtenerArchivo();
    setTimeout(() => {
        res = dao.dameRutaArchivo();
        if(res.length == 0) {
            hayArchivo = false;
        }
        else {
            nombreArchivo = res[0].nombre;
            rutaArchivo = res[0].ruta;
            hayArchivo = true;
        }
    },1000);
    console.log(Color.green("Servidor iniciado en el puerto:"),puerto);
});

app.get('/', (req, res) => {
    res.send("hola");
});

app.post('/subir',(req,res)=> {
    if(!hayArchivo) {
        archivo = req.files.archivo;
        archivo.mv((rutaArchivo = ("./archivos/"+archivo.name)));
        console.log("se subio un archivo");
    }
    else {
        console.log("se intento subir un archivo");
    }
    res.send("<script>window.close()</script>"); 
});

app.post('/iniciar', (req, res) => {
    var usuario, contrasenia, consulta;

    console.log(req);
    usuario = req.nombreUsuario;
    contrasenia = req.contrasenia;
    consulta = "SELECT * FROM usuario "+
        "WHERE nombre_usuario='"+usuario+"' AND contrasenia='"+contrasenia+"'";
    conectorBDA.ejecutarInstruccion(res, consulta);
});

receptor.on('connection',(socket) => {
    if(hayArchivo) {
        administradorArchivo.fijaNombreArchivo(rutaArchivo);
        administradorArchivo.leerGrupos();
        socket.emit('archivoSubido',{
            totalProfesores: administradorArchivo.dameTotalProfesores(),
            totalDepartamentos: administradorArchivo.dameTotalDepartamentos(),
            totalMaterias: administradorArchivo.dameTotalMaterias(),
            totalEdificios: administradorArchivo.dameTotalEdificios(),
            colisiones: administradorArchivo.obtenerColisiones(),
            nombreArchivo: nombreArchivo
        });
    }

    socket.on('subirArchivo',()=> {
        if(!hayArchivo) {
            hayArchivo = true;
            if(archivo.name !== undefined) {
                dao.guardarArchivo(archivo.name,rutaArchivo);
                administradorArchivo.fijaNombreArchivo(rutaArchivo);
                administradorArchivo.leerGrupos();

                socket.emit('archivoSubido',{
                    totalProfesores: administradorArchivo.dameTotalProfesores(),
                    totalDepartamentos: administradorArchivo.dameTotalDepartamentos(),
                    totalMaterias: administradorArchivo.dameTotalMaterias(),
                    totalEdificios: administradorArchivo.dameTotalEdificios(),
                    colisiones: administradorArchivo.obtenerColisiones(),
                    nombreArchivo: archivo.name
                });
            }
        }
        else {
            administradorArchivo.fijaNombreArchivo(rutaArchivo);
            administradorArchivo.leerGrupos();
            socket.emit('mensaje',"ya tienes un archivo");
        }
    });

    socket.on('guardarEnBaseDatos',()=> {

    });

    socket.on('consultarBaseDatos',(parametros)=> {

    });

    socket.on('eliminarArchivo',()=> {
        if(rutaArchivo === "") {
            socket.emit('mensaje',"no tienes ningún archivo aún");
        }
        else {
            archivo = null;
            socket.emit('mensaje',"archivo eliminado");
        }
    });
});*/
var Express = require('express');
var BodyParser = require('body-parser');
var Cors = require('cors');
var Rutas = require("./rutas/Rutas");

const corsOptions = {
    origin: '*'
}

const app = Express();

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.use('/api', Cors(corsOptions), Rutas);

app.get('/', (req, res) =>  res.send('Welcome'));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`http://localhost:${server.address().port}`);
})
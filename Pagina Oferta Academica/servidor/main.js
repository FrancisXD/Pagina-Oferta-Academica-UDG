var Color = require("colors");
var HTTP = require("http");
var Express = require("express");
var SocketIO = require("socket.io");
var FileUpload = require("express-fileupload");
var administradorArchivo = require("./AdministradorMaterias");
var DAO = require("./AdministradorMateriasDAO");

var hayArchivo;
var nombreArchivo;
var rutaArchivo;
var archivo;
var puerto;

var dao = new DAO();
var app = Express();
var servidor = HTTP.createServer(app);
var receptor = SocketIO(servidor,{
    serveClient: true
});

app.set("PUERTO",process.env.PORT || 4000);

app.use(FileUpload());

servidor.listen((puerto = app.get("PUERTO")),() => {
    var res;

    dao.obtenerArchivo();
    setTimeout(() => {
        res = dao.dameRutaArchivo();
        if(res === undefined) {
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
});

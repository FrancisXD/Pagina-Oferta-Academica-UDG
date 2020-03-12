var Color = require("colors");
var HTTP = require("http");
var Express = require("express");
var SocketIO = require("socket.io");
var FileUpload = require("express-fileupload");
var administradorArchivo = require("./AdministradorMaterias");

var rutaArchivo;
var archivo;
var puerto;
var app = Express();
var servidor = HTTP.createServer(app);
var receptor = SocketIO(servidor,{
    serveClient: true
});

app.set("PUERTO",process.env.PORT || 4000);
app.use(FileUpload());
servidor.listen((puerto = app.get("PUERTO")),() => {
    console.log(Color.green("Servidor iniciado en el puerto:"),puerto);
});

app.post('/subir',(req,res)=> {
    archivo = req.files.archivo;
    archivo.mv((nombreArchivo = ("./archivos/"+archivo.name)));
    res.send("bien");
});

receptor.on('connection',(socket) => {
    console.log("Nueva conexión ID: "+socket.id);

    socket.on('subirArchivo',()=> {
        administradorArchivo.fijaNombreArchivo(nombreArchivo);
        administradorArchivo.leerGrupos();

        socket.emit('archivoSubido',{
            totalProfesores: administradorArchivo.dameTotalProfesores(),
            totalDepartamentos: administradorArchivo.dameTotalDepartamentos(),
            totalMaterias: administradorArchivo.dameTotalMaterias(),
            totalEdificios: administradorArchivo.dameTotalEdificios()
        });
    });
});

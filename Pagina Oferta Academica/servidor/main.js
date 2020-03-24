var Express = require('express');
var Cors = require('cors');
var BodyParser = require('body-parser');
var Rutas = require("./rutas/Rutas");

const corsOptions = {
    origin: '*'
}

const app = Express();

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.use('/api', Cors(corsOptions), Rutas);

app.get('/', (req, res) =>  res.send('Bienvenido a un servidor c:'));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`http://localhost:${server.address().port}`);
})
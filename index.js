// Importamos express
let express = require('express');
// Importamos Body Parser
let bodyParser = require('body-parser');
// Importamos Mongoose
let mongoose = require('mongoose');
// Se inicializa la applicacion
let app = express();

// Importamos rutas
let apiRoutes = require("./api-routes");
// Configuramos bodyparser para manejar los post request
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json(),
function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
// Connectamos mongoose a la base de datos
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true,useUnifiedTopology: true});
//mongoose.connect('mongodb+srv://Admin:Rivera02022010@cluster0-fz9tp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true})
var db = mongoose.connection;

// agregamos validacion si la base de datos esta activa
if(!db)
    console.log("Error al conectarse")
else
    console.log("Base de datos conectada Satisfactoriamente!!!")

// Configuramos el puerto de salida de la aplicacion
var port = process.env.PORT || 8080;

// Mandamos mensaje si se conecta a la raiz del proyecto ejemplo http://localhost:8080
app.get('/', (req, res) => res.send('Hola mundo desde la raiz'));

// Usamos Ruteo en la aplicacion
app.use('/api', apiRoutes);
// Lanzamos el puerto que esta escuchando la aplicacion
app.listen(port, function () {
    console.log("Ejecutando RestApi en el puerto " + port);
});
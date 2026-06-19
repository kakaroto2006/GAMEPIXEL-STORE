const express = require('express');
const cors = require('cors');
const PORT = 8080;
//declaracion Rutas
const APIproductos = require('./routes/APIproductos')
const UsuariosValidacion = require('./routes/UsuarioValidacion')
const APIresenias = require('./routes/APIresenia')
const APIcarrito = require('./routes/APIcarrito')
const APIfavoritos = require('./routes/APIfavoritos')
const APIchartJs = require('./routes/APIchartJs')
require('./modelos/FKKeys')

const app = express();



app.use(express.json());
app.use(cors());

// rutas
app.use('/',APIproductos);
app.use('/',UsuariosValidacion);
app.use('/',APIresenias);
app.use('/',APIcarrito);
app.use('/',APIfavoritos);
app.use('/',APIchartJs);




app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
const express = require('express');
const cors = require('cors')
const sequilize = require('./conexion/db')
const app = express();
app.use(express.json());
PORT = 5000;


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto {PORT}`);
}); 
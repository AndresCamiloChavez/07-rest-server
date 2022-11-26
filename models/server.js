const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express(); // inicializando la propiedad app con el servidor
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    // Middlewars -> Son funciones que agrega más funcionalidades al servidor
    this.middlewars();
    this.routes(); // configurando las rutas
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en el puerto", this.port);
    });
  }

  middlewars() {
    this.app.use(cors());
    this.app.use(express.json()); //parseo y lectura del body
    this.app.use(express.static("public")); // use es clave para saber que es un middleware
  }
}

module.exports = Server;

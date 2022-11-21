const express = require("express");

class Server {
  constructor() {
    this.app = express(); // inicializando la propiedad app con el servidor
    this.port = process.env.PORT;

    // Middlewars -> Son funciones que agrega más funcionalidades al servidor
    this.middlewars();
    this.routes(); // configurando las rutas
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.send("<h1>Bienvenidos!!</h1>");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en el puerto", this.port);
    });
  }

  middlewars() {
    this.app.use(express.static("public")); // use es clave para saber que es un middleware
  }
}

module.exports = Server;

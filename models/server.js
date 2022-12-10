const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");
class Server {
  constructor() {
    this.app = express(); // inicializando la propiedad app con el servidor
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
      productos: "/api/productos",
      buscar: "/api/buscar",
      uploads: "/api/uploads",
    };

    //conectar a base de datos
    this.connectDB();

    // Middlewars -> Son funciones que agrega más funcionalidades al servidor
    this.middlewars();

    this.routes(); // configurando las rutas
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
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
    this.app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" })); // carga de archivos
  }
}

module.exports = Server;

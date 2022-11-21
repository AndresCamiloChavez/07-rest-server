require('dotenv').config();
const Server = require('./models/server');

// app.use
const server = new Server();

server.listen();


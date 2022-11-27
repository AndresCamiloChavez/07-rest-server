const { response, request } = require("express");
const Usuario = require('../models/usuario');
const getUsuarios = (req = request, res = response) => {

  const {q, nombre = "No name", apiKey} = req.query;

  // console.log('Valor de los parametros', params);
  res.status(200).json({
    ok: true,
    q,
    nombre,
    apiKey,
    msg: "get API en controlador",
  }); //  retornando un JSON en lugar de un text/html
};

const putUsuario = (req, res) => {
  const id = req.params.id
  res.status(200).json({
    ok: true,
    id,
    msg: "put API controller",
  }); //  retornando un JSON en lugar de un text/html
};

const createUsuario = async (req, res) => {

  const usuario = new Usuario(req.body);
  await usuario.save();

  res.status(201).json({
    ok: true,
    respuesta: req.body,
    usuario,
  });
};

const patchUsuario = (req, res) => {
  res.status(201).json({
    ok: true,
    msg: "patch API - controller",
  });
};
const deleteUsuario = (req, res) => {
  res.status(404).json({
    ok: true,
    msg: "delete API - controller",
  });
};

module.exports = {
  getUsuarios,
  putUsuario,
  createUsuario,
  patchUsuario,
  deleteUsuario,
};

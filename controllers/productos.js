const { response, request } = require("express");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const crearProducto = async (req, res) => {
  const { nombre, categoria, precio, descripcion, disponible } = req.body;

  //Validamos que el nombre no exista
  const existeConNombre = await Producto.findOne({ nombre });
  if (existeConNombre) {
    return res.status(400).json({
      msg: `Ya se encuentra un producto registrado con ese nombre: '${nombre}'`,
    });
  }
  const cateogriaDb = await Categoria.findById(categoria);
  const data = {
    nombre,
    usuario: req.usuarioAuth,
    precio,
    categoria: cateogriaDb,
    descripcion,
    disponible,
  };

  const productoDb = await Producto(data);
  productoDb.save();

  return res.status(200).json({
    msg: "Se ha creado el producto con exito!",
    productoDb,
  });
};

const getProductoById = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  return res.status(200).json(producto);
};

const updateProducto = async (req = request, res = response) => {
  return res.status(200).json(productos);
};

const getProductos = async (req = request, res = response) => {
  const { desde = 0, limit = 5 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true }).skip(Number(desde)).limit(Number(limit)),
  ]);
  return res.status(200).json({
    total,
    productos,
  });
};

module.exports = {
  crearProducto,
  getProductoById,
  getProductos,
  updateProducto
};

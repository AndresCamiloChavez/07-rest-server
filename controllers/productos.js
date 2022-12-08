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
  const producto = await Producto.findById(id)
    .populate("categoria")
    .populate("usuario");
  return res.status(200).json(producto);
};

const updateProducto = async (req = request, res = response) => {
  const { nombre, categoria, precio, descripcion, disponible } = req.body;

  const productoDb = await Producto.findByIdAndUpdate(
    req.params.id,
    { nombre, categoria, precio, descripcion, disponible },
    { new: true }
  );

  return res.status(200).json({
    msg: "Producto actualizado",
    productoDb,
  });
};

const getProductos = async (req = request, res = response) => {
  const { desde = 0, limit = 5 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("categoria")
      .populate("usuario"),
  ]);
  return res.status(200).json({
    total,
    productos,
  });
};
const eliminarProducto = async (req = request, res = response) => {
  const productoDb = await Producto.findByIdAndUpdate(req.params.id, {estado: false});

  return res.status(200).json({
    msg: 'Se elimino un producto',
    productoDb,
  });
};

module.exports = {
  crearProducto,
  getProductoById,
  getProductos,
  updateProducto,
  eliminarProducto
};

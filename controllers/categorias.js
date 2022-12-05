const { response, request } = require("express");
const Categoria = require("../models/categoria");
const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDb = await Categoria.findOne({ nombre });

  if (categoriaDb) {
    res.status(400).json({
      msg: `La categoria ${nombre} ya existe`,
    });
  }

  //generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuarioAuth._id,
  };
  console.log('Data', data);
  const categoria = new Categoria(data);
  await categoria.save();

  res.status(200).json({
    msg: "Categoria creada",
    categoria,
  });
};


//Actualizar categoria

//Obtener categoria - populate
const getCategoriaById = async (req = request, res = response) => {
  const idCategoria = req.params.id;
  const categoria = await Categoria.findById(idCategoria).populate('usuario');
  res.status(200).json({
    msg: 'Hola a todos!!',
    categoria
  });

}


//ObtenerCategorias - paginado - total - populate

const getCategorias = async (req = request, res =response) =>{
  const {desde, limit} = req.query;

  const [categorias, total] = await Promise.all([
    Categoria.find({ estado: true }).skip(Number(desde)).limit(Number(limit)).populate('usuario'),
    Categoria.find({estado: true}).count()
  ]);
  // const categorias = await Categoria.find({ estado: true }).skip(Number(desde)).limit(Number(limit));
  // const total = await Categoria.find({estado: true}).count();
  res.status(200).json({
    categorias,
    total
  });
}
const borrarCategoria = async (req = request, res = response) =>{
  const {id}= req.params;
  console.log('Valor del id ', id);
  const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});
  const {estado, ...resto} = categoria; 
  console.log('estado', estado);
  console.log('resto', resto);

  res.status(200).json({
    categoria,
    id
  });
}




module.exports = {
  crearCategoria,
  getCategoriaById,
  getCategorias,
  borrarCategoria
};

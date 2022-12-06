const { response, request } = require("express");
const Categoria = require("../models/categoria");
const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDb = await Categoria.findOne({ nombre });

  if (categoriaDb) {
    return res.status(400).json({
      msg: `La categoria ${nombre} ya existe`,
    });
  }
  console.log('ESTA PASANDO');
  //generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuarioAuth._id,
  };
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
  const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});
  const {estado, ...resto} = categoria; 

  res.status(200).json({
    categoria,
    id
  });
}
const actualizarCategoria = async (req = request, res = response) =>{
  const {id}= req.params;
  const {nombre} = req.body;

  if(await Categoria.findOne({nombre})){
    return res.status(400).json({
      msg: `La categoria ${nombre} ya se encuentra`
    });

  }
  const categoria = await Categoria.findByIdAndUpdate(id, {nombre});
  
  return res.status(200).json({
    msg: 'Se ha actualizado con exito la categoria',
    categoria
  })

}




module.exports = {
  crearCategoria,
  getCategoriaById,
  getCategorias,
  borrarCategoria,
  actualizarCategoria
};

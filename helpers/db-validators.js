const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Role = require("../models/role");
const Usuario = require("../models/usuario");
const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  console.log("Existe rol", existeRol);
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe`);
  }
};

const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo }); // busqueda por correo
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya se encuentra registrado!`);
  }
};

const existeUsuarioPorId = async (id) => {
  const usuario = await Usuario.findById(id);
  if(!usuario){
    throw new Error(`El ID ${id} no existe`);
  }
};

const existeCategoriaByid = async(id) => {
  if(!id) return;
  const categoria = await Categoria.findById(id);
  console.log('Valor de la categoria', categoria);
  if(!categoria){
    console.log('Ocurre error');
    throw new Error(`La categoria con el id ${id} no existe!`);
  }
}
const existeProductoByid = async(id) => {
  const productoDb = await Producto.findById(id);
  if(!productoDb){
    throw new Error(`El producto con el id ${id} no existe!`);
  }
}
const coleccionesPermitidas = (coleccion = '', coleccionesValidas = []) =>{
  const existeColeccion = coleccionesValidas.includes(coleccion);
  if(!existeColeccion){
    throw new Error(`La ruta (${coleccion}), no es permitida`);
  }
  return true; /// ya que se esta implementando de otra forma, admeás el custon espera true
}

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaByid,
  existeProductoByid,
  coleccionesPermitidas,
};

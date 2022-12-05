const { Schema, model } = require("mongoose");

const CategoriaScheme = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', //relación
    required: true
  }

});

module.exports = model("Categoria", CategoriaScheme);

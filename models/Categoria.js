const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Categoria = mongoose.model("categorias", categoriaSchema); // Nome do modelo aqui deve ser "categorias"
module.exports = Categoria;

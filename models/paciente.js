const mongoose = require("mongoose");

const Paciente = mongoose.model("Paciente", {
  id: String,
  nome: String,
  plano: String,
  idade: Number,
});

module.exports = Paciente;

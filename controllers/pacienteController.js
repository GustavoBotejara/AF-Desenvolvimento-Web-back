const express = require("express");
const router = express.Router();

const Paciente = require("../models/paciente");

router.get("/", async (req, res) => {
  try {
    const paciente = await Paciente.find();
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const paciente = await Paciente.findById(id);
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, plano, idade } = req.body;

    const paciente = {
      nome,
      plano,
      idade,
    };

    const updatePaciente = await Paciente.updateOne({ _id: id }, paciente);

    if (updatePaciente.matchedCount === 0) {
      res.status(422).json({ mensagem: "Paciente não encontrado" });
      return;
    }

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const paciente = await Paciente.findById({ _id: id });

    if (!paciente) {
      res.status(422).json({ mensagem: "Paciente não encontrado" });
      return;
    }

    await Paciente.deleteOne({ _id: id });

    res.status(200).json({ mensagem: `${id} - Excluído com sucesso!` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  const { nome, plano, idade } = req.body;

  const paciente = {
    nome,
    plano,
    idade,
  };

  try {
    await Paciente.create(paciente);
    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;

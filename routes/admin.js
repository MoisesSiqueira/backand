const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.render("admin/categorias");
});

router.get("/categorias", (req, res) => {
  Categoria.find()
    .then((categorias) => {
      res.render("admin/categorias", { categorias });
    })
    .catch((err) => {
      console.log("Erro ao obter categorias: " + err);
      res.status(500).send("Erro ao obter categorias");
    });
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {
  const novaCategoria = new Categoria({
    nome: req.body.nome,
    slug: req.body.slug,
  });

  novaCategoria
    .save()
    .then(() => {
      console.log("Cadastrado com sucesso");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      console.log("Erro ao salvar categoria: " + err);
      res.status(500).send("Erro ao salvar categoria");
    });
});

module.exports = router;

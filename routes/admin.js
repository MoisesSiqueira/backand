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
  var erros = [];

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    erros.push({ texto: "Nome inválido" });
  }

  if (
    !req.body.slug ||
    typeof req.body.slug == undefined ||
    req.body.slug == null
  ) {
    erros.push({ texto: "Slug inválido" });
  }

  if (req.body.nome.length < 2) {
    erros.push({ texto: "Nome muito pequeno" });
  }

  if (erros.length > 0) {
    res.render("admin/addcategorias", { erros: erros });
  } else {
    const novaCategoria = new Categoria({
      nome: req.body.nome,
      slug: req.body.slug,
    });

    new Categoria(novaCategoria)
      .save()
      .then(() => {
        req.flash("success_msg", "Categoria criada com sucesso");
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        req.flash("error_msg", "Erro ao criar categoria: " + err);
        res.redirect("/admin");
        res.status(500).send("Erro ao salvar categoria");
      });
  }
});

module.exports = router;

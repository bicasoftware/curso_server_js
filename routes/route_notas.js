const express = require("express");
const route = express.Router();
const models = require("../models");

route.post('/', (req, res) => {
  var nota = {
    "idmateria": req.body.idmateria,
    "data": req.body.data,
    "nota": req.body.nota
  };

  models.notas.create(nota).then(
    n => res.send(n)
  );
});

route.delete("/", (req, res) => {
  var id = req.body.id;

  if (!Boolean(id)) {
    res.send(500, {
      error: "Missing [id]"
    });
  } else {
    models.notas.destroy({
      where: {
        "id": id
      }
    }).then(s => res.send(200));
  }
});

route.get("/:idmateria", (req, res) => {
  models.notas.findAll({
    where: {
      idmateria: req.params.idmateria
    }
  }).then(notas => res.send(200, notas));
});

module.exports = route;
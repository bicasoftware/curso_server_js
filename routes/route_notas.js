const express = require("express");
const route = express.Router();
const NotaDTO = require("../dto/nota_dto");
const models = require("../models");
const msgs = require("../messages");

route.post('/', (req, res) => {
  let nota = new NotaDTO(req.body);
  models.notas.create(nota).then(n => res.send(n));
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
    }).then(s => res.status(200).send(msgs.removed));
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
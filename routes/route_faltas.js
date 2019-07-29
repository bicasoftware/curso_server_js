const route = require("express").Router();
const faltas = require("../models").faltas;
const FaltasDTO = require("../dto/faltas_dto");

route.post("/", (req, res) => {
  faltas.create(new FaltasDTO(req.body)).then(f => res.send(f));
});

route.delete("/:id", (req, res) => {
  if (!Boolean(req.params.id)) {
    res.send(500, "Missing [id]");
  } else {
    faltas.destroy({
      where: {
        "id": req.params.id
      }
    }).then(_ => res.send(200));
  }
});

route.get("/:idmateria", (req, res) => {

  if (!Boolean(req.params.idmateria)) {
    res.send(500, "Missing [idmateria]");
  } else {
    faltas.findAll({
      where: {
        idmateria: req.params.idmateria
      }
    }).then(f => res.send(200, f));
  }
});

module.exports = route;
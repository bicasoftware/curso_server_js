const route = require("express").Router();
const model = require("../models").faltas;
const FaltasDTO = require("../dto/faltas_dto");
const msgs = require("../messages");

route.post("/", async (req, res) => {
  const falta = await model.create(FaltasDTO(req.body));
  res.status(200).send(falta);
});

route.delete("/:id", async (req, res) => {
  try {
    await model.destroy({
      where: {
        "id": req.params.id
      }
    });

    res.status(200).send(msgs.removed);
  } catch (error) {
    res.status(400).send(`Erro ao remover ${error}`);
  }
});

route.get("/:idmateria", async (req, res) => {

  if (!Boolean(req.params.idmateria)) {
    res.status(400).send("Missing [idmateria]");
  } else {
    const faltas = await model.findAll({
      where: {
        idmateria: req.params.idmateria
      }
    });
    res.status(200).send(faltas);
  }
});

module.exports = route;
const route = require("express").Router();
const model = require("../models").periodos;
const PeriodosDTO = require("../dto/periodos_dto");

route.get("/", async (req, res) => {
  let periodos = await model.findAll();
  res.send(200, periodos);
});

route.get("/:id", async (req, res) => {
  let periodos = await model.findAll({
    where: {
      id: req.params.id
    }
  });

  res.send(200, periodos);
});

route.delete("/:id", async (req, res) => {
  try {
    await model.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send(200);
  } catch (error) {
    res.send(500, `Erro ao remover periodo com a id ${req.params.id}: ${error}`);
  }
});

route.post("/", async (req, res) => {
  let periodo = await model.create(new PeriodosDTO(req.body));
  res.send(periodo);
});

module.exports = route;
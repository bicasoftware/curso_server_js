const route = require("express").Router();
const model = require("../models").materias;
const MateriasDTO = require("../dto/materias_dto");

route.get("/:idperiodo", async (req, res) => {
  try {
    materias = await model.findAll({
      where: {
        idperiodo: req.params.idperiodo
      }
    });
    res.send(200, materias);
  } catch (error) {
    res.send(500, `Nenhum periodo encontrado com a id ${req.params.idperiodo}: ${error}`);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    model.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send(200);
  } catch (error) {
    res.send(500, `Erro ao remover materia ${error}`);
  }
});

route.post("/", async (req, res) => {
  try {
    let materia = await model.create(new MateriasDTO(req.body));
    res.send(200, materia);
  } catch (error) {
    res.send(500, `Erro ao incluir materia ${error}`);
  }
});

module.exports = route;
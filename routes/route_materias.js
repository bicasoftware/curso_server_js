const route = require("express").Router();
const model = require("../models").materias;
const MateriasDTO = require("../dto/materias_dto");
const msgs = require("../messages");
const authMid = require("../middleware/auth");
route.use(authMid);

route.get("/:idperiodo", async (req, res) => {
  try {
    materias = await model.findAll({
      where: {
        idperiodo: req.params.idperiodo
      }
    });
    res.status(200).send(materias);
  } catch (error) {
    res.status(400).send(`Nenhum periodo encontrado com a id ${req.params.idperiodo}: ${error}`);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    model.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send(msgs.removed);
  } catch (error) {
    res.status(400).send(`Erro ao remover materia ${error}`);
  }
});

route.post("/", async (req, res) => {
  try {
    let materia = await model.create(MateriasDTO(req.body));
    res.status(200).send(materia);
  } catch (error) {
    res.send(400, `Erro ao incluir materia ${error}`);
  }
});

module.exports = route;
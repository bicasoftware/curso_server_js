const route = require("express").Router();
const model = require("../models").horarios;
const HorariosDTO = require("../dto/horarios_dto");
const msgs = require("../messages");
const authMid = require("../middleware/auth");
route.use(authMid);

route.post("/", async (req, res) => {
  try {
    horario = await model.create(HorariosDTO(req.body));
    res.status(200).send(horario);
  } catch (error) {
    res.status(400).send(`Falha ao criar horário ${error}`);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    await model.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).send(msgs.removed);
  } catch (ex) {
    res.status(400).send(`Erro ao remover: ${ex}`);
  }
});

route.get("/:idperiodo", async (req, res) => {
  let horariosByPeriodo = await model.findAll({
    where: {
      idperiodo: req.params.idperiodo
    }
  });

  res.send(horariosByPeriodo);
});

module.exports = route;
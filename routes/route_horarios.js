const route = require("express").Router();
const horarios = require("../models").horarios;
const HorariosDTO = require("../dto/horarios_dto");

route.post("/", async (req, res) => {
  let horario = new HorariosDTO(req.body);
  try {
    horario = await horarios.create(horario);
    res.send(horario);
  } catch (error) {
    res.send(500, `Falha ao criar horário ${error}`);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    await horarios.destroy({
      where: {
        id: req.params.id
      }
    });

    res.send(200);
  } catch (ex) {
    res.send(500, `Erro ao remover: ${ex}`);
  }
});

route.get("/:idperiodo", async (req, res) => {
  let horariosByPeriodo = await horarios.findAll({
    where: {
      idperiodo: req.params.idperiodo
    }
  });

  res.send(horariosByPeriodo);
});

module.exports = route;
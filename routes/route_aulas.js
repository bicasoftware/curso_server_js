const route = require("express").Router();
const model = require("../models").aulas;
const AulasDTO = require("../dto/aulas_dto");
const msgs = require("../messages");

route.get('/:idmateria', async (req, res) => {
  const aulas = await model.findAll({
    where: {
      idmateria: req.params.idmateria
    }
  });

  res.status(200).send(aulas);
});

route.post('/', async (req, res) => {
  try {
    const aula = await model.create(AulasDTO(req.body));
    res.status(200).send(aula);
  } catch (error) {
    res.status(400).send(`Erro ao incluir: ${error}`);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    await model.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).send(msgs.removed);
  } catch (error) {
    res.status(400).send(`Erro ao remover: ${error}`);
  }
});

module.exports = route;
const route = require('express').Router()
const models = require('../models')
const PeriodosDTO = require('../dto/periodos_dto')
const msgs = require('../messages')
const authMid = require('../middleware/auth')
route.use(authMid)

route.get('/', async (req, res) => {
  try {
    const periodos = await models.periodos.findAll()
    res.status(200).send(periodos)
  } catch (error) {
    res.status(400).send(`Nenhum dado encontrado: ${error}`)
  }
})

route.get('/:id', async (req, res) => {
  try {
    const periodos = await models.periodos.findOne({
      where: {
        id: req.params.id
      }
    })

    res.status(200).send(periodos)
  } catch (error) {
    res.status(400).send({ error: `Nenhum dado encontrado para a id ${req.params.id} com erro: ${error}` })
  }
})

route.delete('/:id', async (req, res) => {
  try {
    await models.periodos.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).send(msgs.removed)
  } catch (error) {
    res.status(400).send(`Erro ao remover periodo com a id ${req.params.id}: ${error}`)
  }
})

route.post('/', async (req, res) => {
  try {
    const periodo = await models.periodos.create(PeriodosDTO(req.body))
    res.status(200).send(periodo)
  } catch (error) {
    res.status(400).send(`Erro ao incluir periodo: ${error}`)
  }
})

module.exports = route

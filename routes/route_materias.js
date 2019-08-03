const route = require('express').Router()
const model = require('../models').materias
const MateriasDTO = require('../dto/materias_dto')
const routeHelper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.get('/:idperiodo', async (req, res) => {
  await routeHelper.findAllAndRespond(res, model, {
    where: {
      idperiodo: req.params.idperiodo
    }
  })
})

route.delete('/:id', async (req, res) => {
  await routeHelper.deleteAndRespond(res, model, {
    where: {
      id: req.params.id
    }
  })
})

route.post('/', async (req, res) => {
  await routeHelper.createAndRespond(res, model, MateriasDTO(req.body))
})

module.exports = route

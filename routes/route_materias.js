const route = require('express').Router()
const model = require('../models').materias
const MateriasDTO = require('../dto/materias_dto')
const routeHelper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.get('/:idperiodo', async (req, res, next) => {
  await routeHelper.findAllAndRespond(res, next, model, {
    where: {
      idperiodo: req.params.idperiodo
    }
  })
})

route.delete('/:id', async (req, res, next) => {
  await routeHelper.deleteAndRespond(res, next, model, {
    where: {
      id: req.params.id
    }
  })
})

route.post('/', async (req, res, next) => {
  await routeHelper.createAndRespond(res, next, model, MateriasDTO(req.body))
})

module.exports = route

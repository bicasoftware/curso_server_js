const route = require('express').Router()
const models = require('../models')
const PeriodosDTO = require('../dto/periodos_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.get('/', async (req, res, next) => {
  helper.findAllAndRespond(res, next, models.periodos)
})

route.get('/:id', async (req, res, next) => {
  helper.findByPkAndRespond(res, next, models.periodos, req.params.id)
})

route.delete('/:id', async (req, res, next) => {
  helper.deleteAndRespond(res, next, models.periodos, {
    where: {
      id: req.params.id
    }
  })
})

route.post('/', async (req, res, next) => {
  helper.createAndRespond(res, next, models.periodos, PeriodosDTO(req.body))
})

module.exports = route

const route = require('express').Router()
const models = require('../models')
const PeriodosDTO = require('../dto/periodos_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.get('/', async (req, res) => {
  helper.findAllAndRespond(res, models.periodos)
})

route.get('/:id', async (req, res) => {
  helper.findByPkAndRespond(res, models.periodos, req.params.id)
})

route.delete('/:id', async (req, res) => {
  helper.deleteAndRespond(res, models.periodos, {
    where: {
      id: req.params.id
    }
  })
})

route.post('/', async (req, res) => {
  helper.createAndRespond(res, models.periodos, PeriodosDTO(req.body))
})

module.exports = route

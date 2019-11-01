const route = require('express').Router()
const models = require('../models')
const HorariosDTO = require('../dto/horarios_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.post('/', async (req, res, next) => {
  helper.createAndRespond(res, next, models.horarios, HorariosDTO(req.body))
})

route.delete('/:id', async (req, res, next) => {
  helper.deleteAndRespond(res, next, models.horarios, {
    where: {
      id: req.params.id
    }
  })
})

route.get('/:idperiodo', async (req, res, next) => {
  helper.findAllAndRespond(res, next, models.horarios, {
    where: {
      periodoId: req.params.idperiodo
    }
  })
})

module.exports = route

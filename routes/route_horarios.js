const route = require('express').Router()
const model = require('../models').horarios
const HorariosDTO = require('../dto/horarios_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.post('/', async (req, res, next) => {
  helper.createAndRespond(res, next, model, HorariosDTO(req.body))
})

route.delete('/:id', async (req, res, next) => {
  helper.deleteAndRespond(res, next, model, {
    where: {
      id: req.params.id
    }
  })
})

route.get('/:idperiodo', async (req, res, next) => {
  helper.findAllAndRespond(res, next, model, {
    where: {
      idperiodo: req.params.idperiodo
    }
  })
})

module.exports = route

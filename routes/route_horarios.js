const route = require('express').Router()
const model = require('../models').horarios
const HorariosDTO = require('../dto/horarios_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.post('/', async (req, res) => {
  helper.createAndRespond(res, model, HorariosDTO(req.body))
})

route.delete('/:id', async (req, res) => {
  helper.deleteAndRespond(res, model, {
    where: {
      id: req.params.id
    }
  })
})

route.get('/:idperiodo', async (req, res) => {
  helper.findAllAndRespond(res, model, {
    where: {
      idperiodo: req.params.idperiodo
    }
  })
})

module.exports = route

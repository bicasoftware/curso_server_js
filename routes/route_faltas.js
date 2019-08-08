const route = require('express').Router()
const model = require('../models').faltas
const helper = require('../utils/route_helper')
const FaltasDTO = require('../dto/faltas_dto')
const authMiddleware = require('../middleware/auth')
route.use(authMiddleware)

route.post('/', async (req, res, next) => {
  helper.createAndRespond(res, next, model, FaltasDTO(req.body))
})

route.delete('/:id', async (req, res, next) => {
  helper.deleteAndRespond(res, next, model, {
    where: {
      id: req.params.id
    }
  })
})

route.get('/:idmateria', async (req, res, next) => {
  helper.findAllAndRespond(res, next, model, {
    where: {
      materiaId: req.params.idmateria
    }
  })
})

module.exports = route

const route = require('express').Router()
const model = require('../models').faltas
const helper = require('../utils/route_helper')
const FaltasDTO = require('../dto/faltas_dto')
const authMiddleware = require('../middleware/auth')
route.use(authMiddleware)

route.post('/', async (req, res) => {
  helper.createAndRespond(res, model, FaltasDTO(req.body))
})

route.delete('/:id', async (req, res) => {
  helper.deleteAndRespond(res, model, {
    where: {
      id: req.params.id
    }
  })
})

route.get('/:idmateria', async (req, res) => {
  helper.findAllAndRespond(res, model, {
    where: {
      idmateria: req.params.idmateria
    }
  })
})

module.exports = route

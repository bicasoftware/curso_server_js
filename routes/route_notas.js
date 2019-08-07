const express = require('express')
const route = express.Router()
const NotaDTO = require('../dto/nota_dto')
const model = require('../models').notas
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.post('/', async (req, res, next) => {
  helper.createAndRespond(res, next, model, NotaDTO(req.body))
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
      idmateria: req.params.idmateria
    }
  })
})

module.exports = route

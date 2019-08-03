const express = require('express')
const route = express.Router()
const NotaDTO = require('../dto/nota_dto')
const model = require('../models').notas
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.post('/', async (req, res) => {
  helper.createAndRespond(res, model, NotaDTO(req.body))
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

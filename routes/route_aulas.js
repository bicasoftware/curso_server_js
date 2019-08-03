const route = require('express').Router()
const model = require('../models').aulas
const AulasDTO = require('../dto/aulas_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.get('/:idmateria', async (req, res) => {
  helper.findAllAndRespond(res, model, {
    where: {
      idmateria: req.params.idmateria
    }
  })
})

route.post('/', async (req, res) => {
  helper.createAndRespond(res, model, AulasDTO(req.body))
})

route.delete('/:id', async (req, res) => {
  helper.deleteAndRespond(res, model, {
    where: {
      id: req.params.id
    }
  })
})

route.put('/', async (req, res) => {
  const {
    id,
    weekday,
    ordem,
    idmateria
  } = req.body

  helper.putAndRespond(res, model, id, {
    weekday: weekday,
    ordem: ordem,
    idmateria: idmateria
  }, {
    where: {
      id: id
    }
  })
})

module.exports = route

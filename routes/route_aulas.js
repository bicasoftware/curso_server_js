const route = require('express').Router()
const model = require('../models').aulas
const AulasDTO = require('../dto/aulas_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.post('/', async (req, res, next) => {
  helper.createAndRespond(res, next, model, AulasDTO(req.body))
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

route.put('/', async (req, res, next) => {
  const {
    id,
    weekday,
    ordem,
    idmateria
  } = req.body

  helper.putAndRespond(res, next, model, id, {
    weekday: weekday,
    ordem: ordem,
    materiaId: idmateria
  }, {
    where: {
      id: id
    }
  })
})

module.exports = route

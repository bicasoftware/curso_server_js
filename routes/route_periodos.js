const route = require('express').Router()
const models = require('../models')
const PeriodosDTO = require('../dto/periodos_dto')
const helper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

function defaultQuery (userId) {
  return {
    where: {
      usuarioId: userId
    },
    include: [
      {
        model: models.horarios,
        hierarchy: true
      },
      {
        model: models.materias,
        as: 'materias',
        hierarchy: true,
        include: [{
          model: models.faltas,
          hierarchy: true
        }, {
          model: models.aulas,
          hierarchy: true
        }, {
          model: models.notas,
          hierarchy: true
        }]
      }
    ]
  }
}

route.get('/', async (req, res, next) => {
  helper.findAllAndRespond(
    res, next, models.periodos, defaultQuery(req.userId)
  )
})

route.get('/:id', async (req, res, next) => {
  helper.findAllAndRespond(
    res, next, models.periodos, defaultQuery(req.userId)
  )
})

route.delete('/:id', async (req, res, next) => {
  helper.deleteAndRespond(res, next, models.periodos, {
    where: {
      id: req.params.id
    }
  })
})

route.post('/', async (req, res, next) => {
  try {
    var periodo = await models.periodos.create(PeriodosDTO(req.body, req.userId))

    const horarios = req.body.horarios.map(async (h) => {
      h.periodoId = periodo.id
      return models.horarios.create(h)
    })

    const result = JSON.parse(JSON.stringify(periodo))
    result.horarios = await Promise.all(horarios)

    res.status(200).send(result)
  } catch (error) {
    next(error)
  }
})

module.exports = route

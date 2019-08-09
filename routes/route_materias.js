const route = require('express').Router()
const models = require('../models')
const MateriasDTO = require('../dto/materias_dto')
const routeHelper = require('../utils/route_helper')
const authMid = require('../middleware/auth')
route.use(authMid)

route.get('/:idperiodo', async (req, res, next) => {
  try {
    const materias = await models.materias.findAll({
      where: {
        periodoId: req.params.idperiodo
      },
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
    })

    res.status(200).send({ materias: materias })
  } catch (error) {
    next(error)
  }
})

route.delete('/:id', async (req, res, next) => {
  await routeHelper.deleteAndRespond(res, next, models.materias, {
    where: {
      id: req.params.id
    }
  })
})

route.post('/', async (req, res, next) => {
  await routeHelper.createAndRespond(res, next, models.materias, MateriasDTO(req.body))
})

route.post('/many', async (req, res, next) => {
  try {
    const materias = req.body.materias.map(async (m) => {
      m.periodoId = req.body.periodoId
      return models.materias.create(m)
    })
    res.status(200).send({ materias: await Promise.all(materias) })
  } catch (error) {
    routeHelper.moveNext(next, 400, error)
  }
})

module.exports = route

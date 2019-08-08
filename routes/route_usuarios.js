const route = require('express').Router()
const models = require('../models')
const auth = require('../utils/auth_helper')
const moveNext = require('../utils/route_helper').moveNext

async function getData () {
  const periodos = await models.periodos.findAll({
    include: [
      {
        model: models.horarios
      },
      {
        model: models.materias,
        include: [
          { model: models.aulas },
          { model: models.faltas },
          { model: models.notas }
        ]
      }
    ]
  })

  return periodos
}

route.post('/signin', async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  try {
    const count = await models.usuarios.count({
      where: {
        email: email
      }
    })

    if (count > 0) {
      moveNext(next, 500, 'Email já cadastrado')
    } else {
      const hash = await auth.genHash(password)

      const user = await models.usuarios.create({
        email: email,
        password: hash
      })

      res.status(200).send({
        email: email,
        token: await auth.genToken({
          id: user.id
        })
      })
    }
  } catch (error) {
    moveNext(next, 401, error.message)
  }
})

route.post('/login', async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  try {
    const user = await models.usuarios.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      moveNext(next, 400, 'Email não cadastrado')
    } else if (!await auth.compareHash(password, user.password)) {
      moveNext(next, 400, 'Senha inválida')
    } else {
      const token = await auth.genToken({ id: user.id })
      res.status(200).send({
        email: user.email,
        data: await getData(),
        token: token
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = route

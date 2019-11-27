const route = require('express').Router()
const models = require('../models')
const auth = require('../utils/auth_helper')
const moveNext = require('../utils/route_helper').moveNext

async function getData() {
  const periodos = await models.periodos.findAll({
    include: [
      {
        model: models.horarios,
        hierarchy: true,
        as: 'horarios'
      },
      {
        model: models.materias,
        hierarchy: true,
        include: [
          {
            model: models.aulas,
            hierarchy: true
          },
          {
            model: models.faltas,
            hierarchy: true
          },
          {
            model: models.notas,
            hierarchy: true
          }
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
        data: { periodos: await getData() },
        configurations: await models.configurations.findOne({
          where: {
            usuarioId: user.id
          }
        }),
        token: token
      })
    }
  } catch (error) {
    next(error)
  }
})

route.post('/unregister', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      moveNext(next, 400, "Email não cadastrado")
    } else if (!password) {
      moveNext(next, 400, "Senha não fornecida")
    } else {
      const usuario = await models.usuarios.findOne({
        where: {
          email: email
        }
      })

      if (!usuario) {
        moveNext(next, 400, "Email não encontrado")
      } else if (!await auth.compareHash(password, usuario.password)) {
        moveNext(next, 400, "Senha inválida")
      } else {
        await models.usuarios.destroy({
          where: {
            email: email
          }
        })

        res.status(200).send({ "status": "ok" })
      }
    }
  } catch (ex) {
    moveNext(next, 400, "Falha ao descadastrar")
  }
});

module.exports = route

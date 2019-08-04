const route = require('express').Router()
const model = require('../models').usuarios
const auth = require('../utils/auth_helper')

route.post('/signin', async (req, res) => {
  const {
    email,
    password
  } = req.body

  if (await emailExists(email)) {
    res.status(500).send({
      error: 'Email já cadastrado'
    })
  } else {
    const hash = await auth.genHash(password)

    const user = await model.create({
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
})

route.post('/login', async (req, res) => {
  const {
    email,
    password
  } = req.body

  try {
    const user = await model.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      res.status(400).send({
        error: 'Email não cadastrado'
      })
    } else if (!await auth.compareHash(password, user.password)) {
      res.status(400).send({
        error: 'Senha inválida'
      })
    } else {
      const token = await auth.genToken({ id: user.id })

      res.status(200).send({
        email: user.email,
        token: token
      })
    }
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})

async function emailExists (email) {
  const count = await model.count({
    where: {
      email: email
    }
  })

  return count > 0
}

module.exports = route

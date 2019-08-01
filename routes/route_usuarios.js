const route = require('express').Router()
const model = require('../models').usuarios
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/authconfig')

route.post('/signin', async (req, res) => {
  const {
    email,
    password
  } = req.body
  res.send({
    email: email,
    password: password,
    body: req.body
  })
  if (await emailExists(email)) {
    res.status(500).send({
      error: 'Email já cadastrado'
    })
  } else {
    const hash = await genHash(password)

    const user = await model.create({
      email: email,
      password: hash
    })

    res.status(200).send({
      email: email,
      token: genToken({
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

  const user = await model.findOne({
    where: {
      email: email
    }
  })

  if (!user) {
    res.status(400).send({
      error: 'Email não cadastrado'
    })
  } else if (!await bcrypt.compare(password, user.password)) {
    res.status(400).send({
      error: 'Senha inválida'
    })
  } else {
    const token = jwt.sign({
      id: user.id
    }, authConfig.secret, {
      expiresIn: (24 * 60 * 60)
    })
    user.password = undefined

    res.status(200).send({
      user: user,
      token: token
    })
  }
})

async function emailExists(email) {
  const count = await model.count({
    where: {
      email: email
    }
  })

  return count > 0
}

async function genHash(pwd) {
  return bcrypt.hash(pwd, 10)
}

async function genToken(params) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: (24 * 60 * 60)
  })
}

module.exports = route
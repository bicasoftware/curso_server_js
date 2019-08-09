const route = require('express').Router()

route.get('/', async (req, res) => {
  res.status(200).send({ status: 'OKAY' })
})

module.exports = route

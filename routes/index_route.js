const route = require('express').Router()
const path = require('path')

route.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.resolve('./public/index.html'))
  } catch (error) {
    next(error)
  }
})

module.exports = route

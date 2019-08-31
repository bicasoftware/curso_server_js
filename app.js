const logger = require('morgan')
const path = require('path')
const express = require('express')
const parser = require('body-parser')
const cors = require('cors')

const app = express()

app.use('/static', express.static('public'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cors())
app.use(require('compression')())

app.use('/', require('./routes/index_route'))
app.use('/notas', require('./routes/route_notas'))
app.use('/faltas', require('./routes/route_faltas'))
app.use('/horarios', require('./routes/route_horarios'))
app.use('/materias', require('./routes/route_materias'))
app.use('/periodos', require('./routes/route_periodos'))
app.use('/aulas', require('./routes/route_aulas'))
app.use('/auth', require('./routes/route_usuarios'))

app.use((err, req, res, next) => {
  res.status(err.code | 400).send({ error: err.message })
})

app.get('*', (req, res) => {
  res.status(404).send({ error: 'Not Found' })
})

module.exports = app

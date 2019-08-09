var logger = require('morgan')
var express = require('express')
var parser = require('body-parser')
var app = express()

/* Routes */

var routeNotas = require('./routes/route_notas')
var routeFaltas = require('./routes/route_faltas')
var routeHorarios = require('./routes/route_horarios')
var routeMaterias = require('./routes/route_materias')
var routePeriodos = require('./routes/route_periodos')
var routeAulas = require('./routes/route_aulas')
var routeUsuarios = require('./routes/route_usuarios')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(parser.json())

app.use('/', require('./routes/index_route'))
app.use('/notas', routeNotas)
app.use('/faltas', routeFaltas)
app.use('/horarios', routeHorarios)
app.use('/materias', routeMaterias)
app.use('/periodos', routePeriodos)
app.use('/aulas', routeAulas)
app.use('/auth', routeUsuarios)

app.use((err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send({ error: 'Page Not Found' })
  }
  res.status(err.code | 400).send({ error: err.message })
})

module.exports = app

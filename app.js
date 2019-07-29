var logger = require('morgan');
var express = require('express');
var parser = require('body-parser');
var app = express();

/* Routes */

var routeNotas = require("./routes/route_notas");
var routeFaltas = require("./routes/route_faltas");
var routeHorarios = require("./routes/route_horarios");
var routeMaterias = require("./routes/route_materias");
var routePeriodos = require("./routes/route_periodos");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(parser.json());

app.use('/notas', routeNotas);
app.use('/faltas', routeFaltas);
app.use('/horarios', routeHorarios);
app.use('/materias', routeMaterias);
app.use('/periodos', routePeriodos);

module.exports = app;

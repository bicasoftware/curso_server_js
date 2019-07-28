/*
  TODO - adicionar router para Horarios, Materias e Periodos;
*/

var express = require('express');
var path = require('path');
var logger = require('morgan');
var parser = require('body-parser');
var testeRoute = require("./routes/teste_route");
var routeNotas = require("./routes/route_notas");
var routeFaltas = require("./routes/route_faltas");
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(parser.json());

app.use('/test', testeRoute);
app.use('/notas', routeNotas);
app.use('/faltas', routeFaltas);

module.exports = app;

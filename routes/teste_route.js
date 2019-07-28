var express = require('express');
var router = express.Router();
const faltas = require("../models").faltas;

var faker = require("faker");

router.get("/", (req, res) => {
    faltas.findAll().then(f => res.send(f));
});

router.post("/", (req, res) => {

    res.send(req.body);

    /* let falta = {
        data: req.body.data,
        idmateria: req.body.idmateria,
        ordemaula: req.body.ordemaula
    }

    faltas.create(falta).then(f => res.send(f)); */
});

router.get("/faker", (req, res) => {
    var clientes = [];
    for (var i = 0; i < 10; i++) {
        clientes.push({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        });
    }

    res.send({
        "clientes": clientes
    });
});

router.post("/ls", (req, res) => {
    let nomes = req.body
        .filter(it => it.idade !== 31)
        .map(it => `nome: ${it.nome} - idade: ${it.idade}`);
    res.send({
        "nomes": nomes
    });
});

module.exports = router;
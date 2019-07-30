const route = require("express").Router();
const model = require("../models").usuarios;
const bcrypt = require('bcrypt');

route.post('/signin', async (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (await emailExists(email)) {
    res.status(500).send({
      error: "Email já cadastrado"
    });
  } else {
    const hash = await genHash(password);

    const user = await model.create({
      "email": email,
      "password": hash
    });

    res.status(200).send(user);
  }
});

route.post('/login', async (req, res) => {
  /** TODOrs
   * gerar JWT
   * retornar JWT
   * COMMITAR
   * */
  const {
    email,
    password
  } = req.body;

  const user = await model.findOne({
    where: {
      email: email
    }
  });

  if (!user) {
    res.status(400).send({
      "error": "Email não cadastrado"
    });
  } else if (!await bcrypt.compare(password, user.password)) {
    res.status(400).send({
      "error": "Senha inválida"
    });
  } else {
    res.status(200).send({
      "id": user.id
    });
  }
});

async function emailExists(email) {
  const count = await model.count({
    where: {
      email: email
    }
  });

  return count > 0;
}

async function genHash(pwd) {
  return await bcrypt.hash(pwd, 10);
}

module.exports = route;
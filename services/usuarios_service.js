const models = require('../models')

module.exports = {
  addUser: async function (hash, email) {

    const user = await models.usuarios.create({
      email: email,
      password: hash
    })

    const periodo = await models.periodos.create({
      presObrig: 70,
      aulasdia: 4,
      numperiodo: 1,
      inicio: new Date(2019, 05, 12),
      termino: new Date(2019, 11, 13),
      medaprov: 7.0,
      usuarioId: user.id
    })

    await models.horarios.create({
      periodoId: periodo.id,
      ordemaula: 0,
      inicio: "18:00",
      termino: "18:30"
    })

    await models.horarios.create({
      periodoId: periodo.id,
      ordemaula: 1,
      inicio: "18:30",
      termino: "19:00"
    })

    await models.horarios.create({
      periodoId: periodo.id,
      ordemaula: 2,
      inicio: "19:00",
      termino: "19:30"
    })

    await models.horarios.create({
      periodoId: periodo.id,
      ordemaula: 3,
      inicio: "19:30",
      termino: "20:00"
    })

    const materia = await models.materias.create({
      cor: 000000,
      nome: "Matemática",
      sigla: "MAT",
      freq: 0,
      medaprov: 7.0,
      periodoId: periodo.id
    })

    await models.faltas.create({
      materiaId: materia.id,
      data: new Date(2019, 09, 12),
      ordemAula: 0
    })

    await models.faltas.create({
      materiaId: materia.id,
      data: new Date(2019, 09, 12),
      ordemAula: 1
    })

    for (let i = 0; i <= 4; i++) {
      await models.aulas.create({
        materiaId: materia.id,
        weekday: 1,
        ordem: i
      })
    }

    await models.notas.create({
      materiaId: materia.id,
      data: new Date(2019, 11, 14),
      nota: 8.0
    })

    return user
  }
}
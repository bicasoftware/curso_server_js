module.exports = function AulasDTO (body) {
  return {
    materiaId: body.idmateria,
    weekday: body.weekday,
    ordem: body.ordem
  }
}

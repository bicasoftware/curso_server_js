module.exports = function AulasDTO (body) {
  return {
    materiaId: body.materiaId,
    weekday: body.weekday,
    ordem: body.ordem
  }
}

module.exports = function AulasDTO (body) {
  return {
    idmateria: body.idmateria,
    weekday: body.weekday,
    ordem: body.ordem
  }
}

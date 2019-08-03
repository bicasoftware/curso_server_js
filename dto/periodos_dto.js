module.exports = function PeriodosDTO (body) {
  return {
    presObrig: body.presObrig,
    aulasdia: body.aulasdia,
    numperiodo: body.numperiodo,
    inicio: body.inicio,
    termino: body.termino,
    medaprov: body.medaprov
  }
}

module.exports = function HorariosDTO (body) {
  return {
    periodoId: body.periodoId,
    ordemaula: body.ordemaula,
    inicio: body.inicio,
    termino: body.termino
  }
}

module.exports = function HorariosDTO (body) {
  return {
    idperiodo: body.idperiodo,
    ordemaula: body.ordemaula,
    inicio: body.inicio,
    termino: body.termino
  }
}

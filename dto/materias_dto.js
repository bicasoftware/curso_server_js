module.exports = function MateriasDTO (body) {
  return {
    cor: body.cor,
    nome: body.nome,
    sigla: body.sigla,
    freq: body.freq,
    medaprov: body.medaprov,
    periodoId: body.periodoId
  }
}

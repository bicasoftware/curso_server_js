module.exports = function NotaDTO (body) {
  return {
    materiaId: body.materiaId,
    data: body.data,
    nota: body.nota
  }
}

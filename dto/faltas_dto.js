module.exports = function FaltaDTO (body) {
  return {
    materiaId: body.materiaId,
    data: body.data,
    ordemAula: body.ordemAula
  }
}

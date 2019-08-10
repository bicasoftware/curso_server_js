module.exports = function FaltaDTO (body) {
  return {
    materiaId: body.idmateria,
    data: body.data,
    ordemAula: body.ordemAula
  }
}

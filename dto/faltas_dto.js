module.exports = function FaltaDTO (body) {
  return {
    idmateria: body.idmateria,
    data: body.data,
    ordemAula: body.ordemAula
  }
}

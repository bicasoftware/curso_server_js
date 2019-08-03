module.exports = function NotaDTO (body) {
  return {
    idmateria: body.idmateria,
    data: body.data,
    nota: body.nota
  }
}

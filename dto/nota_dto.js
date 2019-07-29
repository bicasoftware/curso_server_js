module.exports = class NotaDTO {
  constructor(body) {
    this.idmateria = body.idmateria;
    this.data = body.data;
    this.nota = body.nota;
  }
}
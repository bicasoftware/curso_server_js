module.exports = class FaltasDTO {
  constructor(body) {
    this.idmateria = body.idmateria;
    this.data = body.data;
    this.ordemAula = body.ordemAula;
  }
}
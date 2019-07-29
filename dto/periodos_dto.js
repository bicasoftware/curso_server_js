module.exports = class PeriodosDTO {
  constructor(body) {
    this.presObrig = body.presObrig;
    this.aulasdia = body.aulasdia;
    this.numperiodo = body.numperiodo;
    this.inicio = body.inicio;
    this.termino = body.termino;
    this.medaprov = body.medaprov;
  }
}
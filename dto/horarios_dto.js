module.exports = class Horarios {
  constructor(body) {
    this.idperiodo = body.idperiodo;
    this.ordemaula = body.ordemaula;
    this.inicio = body.inicio;
    this.termino = body.termino;
  }
}
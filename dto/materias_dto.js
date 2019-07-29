module.exports = class MateriasDTO {
  constructor(body) {
    this.cor = body.cor;
    this.nome = body.nome;
    this.sigla = body.sigla;
    this.freq = body.freq;
    this.medaprov = body.medaprov;
  }
}
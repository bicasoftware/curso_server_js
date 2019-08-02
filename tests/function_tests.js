const assert = require("assert");

describe('testando', () => {
  it("test2", function () {
    assert.equal(1, 1);
  });

  it("object copying", function () {
    const nomes = {
      nome: "saulo",
      midname: "henrique",
      lastname: "andrioli",
      numbers: [1, 2, 3, 4, 5, 6]
    }

    const spreadNames = {
      ...nomes
    }
    assert.deepEqual(nomes, spreadNames)
  });

  it("datas", function(){
    const date1 = new Date()
    console.log(typeof date1)
    console.log(date1.getDate())
    console.log(date1.getMonth())
    console.log(date1.getFullYear())
    console.log(date1.getHours())
    console.log(date1.getMinutes())
  })
});
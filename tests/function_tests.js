/* eslint-disable no-undef */
const assert = require('assert')
const hashGenerator = require('../utils/hash_generator')

describe('testando', () => {
  it('test2', function () {
    assert.strictEqual(1, 1)
  })

  it('genhash', async () => {
    const hash = await hashGenerator.genHash('maluco')
    console.log(hash)
  })

  it('genBcrypthash', async () => {
    const hash = await hashGenerator.genBCryptHash('maluco')
    console.log(hash)
  })
})

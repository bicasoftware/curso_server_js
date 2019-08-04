const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/authconfig')

module.exports = {

  genHash: async function genHash (pwd) {
    return argon2.hash(pwd, 10)
  },
  compareHash: async function compareHash (incomePwd, localPwd) {
    return argon2.verify(localPwd, incomePwd)
  },
  genToken: async function genToken (params) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: (24 * 60 * 60)
    })
  }
}

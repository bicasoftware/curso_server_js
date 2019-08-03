const jwt = require('jsonwebtoken')
const authConfig = require('../config/authconfig')

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send({
      error: 'No token provided'
    })
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    return res.status(401).send({
      error: 'Token error'
    })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({
      error: 'Malformated token'
    })
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({
          error: `Token expired at: ${err.expiredAt}`
        })
      } else {
        return res.status(401).send({
          error: 'Invalid token'
        })
      }
    } else {
      req.userId = decoded.id
      return next()
    }
  })
}

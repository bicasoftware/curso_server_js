const jwt = require('jsonwebtoken')
const authConfig = require('../config/authconfig')
const models = require('../models')
const moveNext = require('../utils/route_helper').moveNext

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return moveNext(next, 401, 'No Access Token Provided')
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    return moveNext(next, 401, 'Token error')
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return moveNext(next, 401, 'Malformated token')
  }

  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return moveNext(next, 401, 'Token expired')
      } else {
        return moveNext(next, 401, 'Invalid Token')
      }
    } else {
      if (!decoded.id) {
        return moveNext(next, 401, 'Tampered Token')
      } else {
        const user = await models.usuarios.findOne({
          where: {
            id: decoded.id
          }
        })

        if (!user) {
          return moveNext(next, 401, 'Invalid User')
        }
      }
      req.userId = decoded.id
      next()
    }
  })
}

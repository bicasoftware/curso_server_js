const router = require('express').Router()
const models = require('../models')
const authMid = require('../middleware/auth')

router.use(authMid)

router.get('/', async (req, res, next) => {
  try {
    const conf = await models.configurations.findOne({
      where: {
        usuarioId: req.userId
      }
    })

    if (!conf) {
      const newConfig = await models.configurations.create({
        usuarioId: req.userId,
        isLight: true,
        notify: true
      })

      res.status(200).send({ config: newConfig });
    } else {
      res.status(200).send({ config: conf });
    }
  } catch (e) {
    next(e)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { isLight, notify } = req.body
    let config = await models.configurations.update(
      {
        isLight: isLight,
        notify: notify
      },
      {
        where: {
          usuarioId: req.userId
        }
      } 
    )

    config = models.configurations.findOne(
      {
        where: {
          usuarioId: req.userId
        }
      }
    )

    res.status(200).send({ timestamp: config.updatedAt })
  } catch (e) {
    next(e)
  }
});

module.exports = router
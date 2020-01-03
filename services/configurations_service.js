const models = require('../models')

module.exports = {
  initConfig: async function (idUser) {
    const conf = await models.configurations.create({
      usuarioId: idUser,
      notify: true,
      isLight: true
    })

    return {
      notify: conf.notify,
      isLight: conf.isLight
    }
  },

  findConfig: async (idUser) => {
    const conf = await models.configurations.findOne({
      where: {
        usuarioId: idUser
      }
    })

    return {
      notify: conf.notify,
      isLight: conf.isLight
    }
  }
}
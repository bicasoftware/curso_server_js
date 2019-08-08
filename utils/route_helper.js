module.exports = {

  findAllAndRespond: async function findAllAndRespond (res, next, _model, filter) {
    try {
      const results = await _model.findAll(filter)
      res.status(200).send(results)
    } catch (error) {
      next(error)
    }
  },
  findByPkAndRespond: async function findByPkAndRespond (res, next, _model, id) {
    try {
      const results = await _model.findByPk(id)
      res.status(200).send(results)
    } catch (error) {
      next(error)
    }
  },
  deleteAndRespond: async function deleteAndRespond (res, next, _model, filter) {
    try {
      _model.destroy(filter)
      res.status(200).send()
    } catch (error) {
      next(error)
    }
  },
  createAndRespond: async function createAndRespond (res, next, _model, data) {
    try {
      const result = await _model.create(data)
      res.status(200).send({
        id: result.id,
        timestamp: result.createdAt
      })
    } catch (error) {
      next(error)
    }
  },
  putAndRespond: async function putAndRespond (res, next, model, id, data, whereArgs) {
    try {
      await model.update(data, whereArgs)

      const result = await model.findByPk(id)

      res.status(200).send({
        id: result.id,
        timestamp: result.updatedAt
      })
    } catch (error) {
      next(error)
    }
  },
  moveNext: function moveNext (next, code, message) {
    const err = Error(message)
    err.code = code
    next(err)
  }
}

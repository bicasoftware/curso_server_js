module.exports = {

  findAllAndRespond: async function findAllAndRespond (res, _model, filter) {
    try {
      const results = await _model.findAll(filter)
      res.status(200).send(results)
    } catch (error) {
      res.status(400).send({ error: error })
    }
  },
  findByPkAndRespond: async function findByPkAndRespond (res, _model, id) {
    try {
      const results = await _model.findByPk(id)
      res.status(200).send(results)
    } catch (error) {
      res.status(400).send({ error: error })
    }
  },
  deleteAndRespond: async function deleteAndRespond (res, _model, filter) {
    try {
      _model.destroy(filter)
      res.status(200).send()
    } catch (error) {
      res.status(400).send({ error: error })
    }
  },
  createAndRespond: async function createAndRespond (res, _model, data) {
    try {
      const result = await _model.create(data)
      res.status(200).send({
        id: result.id,
        timestamp: result.createdAt
      })
    } catch (error) {
      res.status(400).send({ error: error })
    }
  },
  putAndRespond: async function putAndRespond (res, model, id, data, whereArgs) {
    try {
      await model.update(data, whereArgs)

      const result = await model.findByPk(id)

      res.status(200).send({
        id: result.id,
        timestamp: result.updatedAt
      })
    } catch (error) {
      res.status(400).send({
        error: error
      })
    }
  }
}

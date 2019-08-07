module.exports = function (sequelize, DataTypes) {
  var notas = sequelize.define('notas', {
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        max: 10.0,
        min: 0.0,
        inNumeric: true
      }
    }
  })

  notas.associate = (models) => {
    notas.belongsTo(
      models.materias, {
        through: 'idmateria',
        as: 'id_materia',
        foreignKey: 'idmateria',
        hierarchy: true
      }
    )
  }

  return notas
}

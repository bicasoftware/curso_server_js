module.exports = function (sequelize, DataTypes) {
  var aulas = sequelize.define('aulas', {
    weekday: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        len: [1, 2],
        min: 0,
        max: 6
      }
    },
    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        len: [0, 12]
      }
    }
  }, {
    tablename: 'notas',
    freezeTableName: true,
    timestamps: true,
    hierarchy: true
  })

  aulas.associate = (models) => {
    aulas.belongsTo(
      models.materias, {
        hierarchy: true,
        onDelete: 'CASCADE'
      }
    )
  }

  return aulas
}

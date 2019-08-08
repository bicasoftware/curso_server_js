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
        min: 0.0
      }
    }
  }, {
    tablename: 'notas',
    freezeTableName: true,
    timestamps: true,
    hierarchy: true
  })

  notas.associate = (models) => {
    notas.belongsTo(
      models.materias, {
        hierarchy: true,
        onDelete: 'CASCADE'
      }
    )
  }

  return notas
}

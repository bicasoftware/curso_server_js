module.exports = function (sequelize, DataTypes) {
  var faltas = sequelize.define('faltas', {
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    ordemAula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        len: [0, 12]
      }
    }
  })

  faltas.associate = (models) => {
    faltas.belongsTo(
      models.materias, {
        through: 'idmateria',
        as: 'id_materia',
        foreignKey: 'idmateria',
        onDelete: 'CASCADE',
        hierarchy: true
      }
    )
  }

  return faltas
}

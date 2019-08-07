module.exports = function (sequelize, DataType) {
  var horarios = sequelize.define('horarios', {
    inicio: {
      type: DataType.STRING,
      allowNull: false
    },
    termino: {
      type: DataType.STRING,
      allowNull: false
    },
    ordemaula: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        isInt: true,
        len: [0, 12]
      }
    }
  })

  horarios.associate = (models) => {
    horarios.belongsTo(
      models.periodos, {
        through: 'idperiodo',
        as: 'id_periodo',
        foreignKey: 'idperiodo',
        onDelete: 'CASCADE',
        hierarchy: true
      }
    )
  }

  return horarios
}

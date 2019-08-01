module.exports = function (sequelize, DataType) {
  var horarios = sequelize.define('horarios', {
    inicio: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    termino: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isDate: true
      }
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
  });

  horarios.associate = (models) => {
    horarios.belongsTo(
      models.periodos, {
        through: 'idperiodo',
        as: "id_periodo",
        foreignKey: "idperiodo",
        onDelete: "CASCADE"
      }
    )
  }

  return horarios;
}
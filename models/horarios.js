module.exports = function (sequelize, DataType) {
  var horarios = sequelize.define('horarios', {
    idperiodo: DataType.INTEGER,
    ordemaula: DataType.INTEGER,
    inicio: DataType.STRING,
    termino: DataType.STRING
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
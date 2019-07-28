module.exports = function (sequelize, DataTypes) {
  var faltas = sequelize.define('faltas', {
    data: DataTypes.DATE,
    ordemAula: DataTypes.INTEGER
  });

  faltas.associate = (models) => {
    faltas.belongsTo(
      models.materias, {
        through: 'idmateria',
        as: "id_materia",
        foreignKey: "idmateria",
        onDelete: "CASCADE"
      }
    )
  }

  return faltas;
}
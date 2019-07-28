module.exports = function (sequelize, DataTypes) {
  var aulas = sequelize.define("aulas", {
    weekday: DataTypes.INTEGER,
    ordem: DataTypes.INTEGER
  });

  aulas.associate = (models) => {
    aulas.belongsTo(
      models.materias, {
        through: 'idmateria',
        as: "id_materia",
        foreignKey: "idmateria"
      }
    )
  }

  return aulas;
}
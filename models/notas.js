module.exports = function (sequelize, DataTypes) {
  var notas = sequelize.define("notas", {
    data: DataTypes.DATE,
    nota: DataTypes.FLOAT
  });

  notas.associate = (models) => {
    notas.belongsTo(
      models.materias, {
        through: 'idmateria',
        as: "id_materia",
        foreignKey: "idmateria"
      }
    );
  }

  return notas;
}
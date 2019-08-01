module.exports = function (sequelize, DataTypes) {
  var aulas = sequelize.define("aulas", {
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
      validate:{
        isNumeric: true,
        isInt: true,
        len: [0, 12]
      }
    }
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
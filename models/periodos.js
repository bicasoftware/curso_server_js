module.exports = function (sequelize, DataTypes) {
  var periodos = sequelize.define('periodos', {
    presObrig: DataTypes.INTEGER,
    aulasdia: DataTypes.INTEGER,
    numperiodo: DataTypes.INTEGER,
    inicio: DataTypes.DATE,
    termino: DataTypes.DATE,
    medaprov: DataTypes.FLOAT
  });

  periodos.associate = (models) => {
    periodos.hasMany(models.materias);
    periodos.hasMany(models.horarios);
  }

  return periodos;
}
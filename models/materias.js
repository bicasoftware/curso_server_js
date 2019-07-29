module.exports = function (sequelize, DataTypes) {
  var materias = sequelize.define('materias', {
    cor: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    sigla: DataTypes.STRING,
    freq: DataTypes.INTEGER,
    medaprov: DataTypes.FLOAT
  });

  materias.associate = (models) => {
    materias.belongsTo(
      models.periodos, {
        through: 'idperiodo',
        as: "id_periodo",
        foreignKey: "idperiodo",
        onDelete: "CASCADE"
      }
    );

    materias.hasMany(models.faltas);
    materias.hasMany(models.aulas);
    materias.hasMany(models.notas);
  }

  return materias;
}
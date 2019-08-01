module.exports = function (sequelize, DataTypes) {
  var materias = sequelize.define('materias', {
    cor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphaNumeric: true,
        noEmpty: true
      }
    },
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphaNumeric: true,
        noEmpty: true,
        len: [1, 12]
      }
    },
    freq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [1],
        min: 0,
        max: 1
      }
    },
    medaprov: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        max: 10.0,
        min: 0.0,
        inNumeric: true
      }
    },
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
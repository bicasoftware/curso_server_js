module.exports = function (sequelize, DataTypes) {
  var periodos = sequelize.define('periodos', {
    numperiodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 2],
        min: 1,
        max: 12
      }
    },
    aulasdia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 2],
        min: 1,
        max: 12
      }
    },
    inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    termino: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    presObrig: {
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
        isNumeric: true
      }
    }
  });

  periodos.associate = (models) => {
    periodos.hasMany(models.materias);
    periodos.hasMany(models.horarios);
  }

  return periodos;
}
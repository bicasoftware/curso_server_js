module.exports = function (sequelize, DataTypes) {
  var configurations = sequelize.define('configurations', {
    isLight: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    notify: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    tablename: 'configurations',
    freezeTableName: true,
    timestamps: true,
    hierarchy: true
  })

  configurations.associate = (models) => {
    configurations.belongsTo(
      models.usuarios, {
      onDelete: "CASCADE",
      hierarchy: true
    })
  }

  return configurations
}
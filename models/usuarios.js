module.exports = function (sequelize, DataTypes) {
  var usuarios = sequelize.define('usuarios', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  })

  return usuarios
}

'use strict';


module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username:{
      type: DataTypes.STRING,
    },
    name:{
      type: DataTypes.STRING,
    },
    displayPicture:{
      type: DataTypes.STRING,
    },
    email:{
      type: DataTypes.STRING,
    },
    mobile:{
      type: DataTypes.INTEGER,
    },
    password:{
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  users.associate = (models) => {
    // users.belongsTo(models.Todo, {
    //   foreignKey: 'todoId',
    //   onDelete: 'CASCADE',
    // });
  };
  return users;
}

'use strict';


module.exports = (sequelize, DataTypes) => {
  const gifts = sequelize.define('gifts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId:{
      type: DataTypes.UUID,
    },
    title:{
      type: DataTypes.STRING,
    },
    content:{
      type: DataTypes.STRING,
    },
    img:{
      type: DataTypes.STRING,
    },
    link:{
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  gifts.associate = (models) => {
    // users.belongsTo(models.Todo, {
    //   foreignKey: 'todoId',
    //   onDelete: 'CASCADE',
    // });
  };
  return gifts;
}

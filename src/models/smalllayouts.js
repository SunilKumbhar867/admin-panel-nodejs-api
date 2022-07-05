'use strict';


module.exports = (sequelize, DataTypes) => {
  const smalllayouts = sequelize.define('smalllayouts', {
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
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  smalllayouts.associate = (models) => {
    // users.belongsTo(models.Todo, {
    //   foreignKey: 'todoId',
    //   onDelete: 'CASCADE',
    // });
  };
  return smalllayouts;
}

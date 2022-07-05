'use strict';


module.exports = (sequelize, DataTypes) => {
  const slidings = sequelize.define('slidings', {
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

  slidings.associate = (models) => {
    // users.belongsTo(models.Todo, {
    //   foreignKey: 'todoId',
    //   onDelete: 'CASCADE',
    // });
  };
  return slidings;
}

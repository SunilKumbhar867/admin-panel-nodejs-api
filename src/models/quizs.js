'use strict';


module.exports = (sequelize, DataTypes) => {
  const quizs = sequelize.define('quizs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId:{
      type: DataTypes.UUID,
    },
    question:{
      type: DataTypes.STRING,
    },
    opt1:{
      type: DataTypes.STRING,
    },
    opt2:{
      type: DataTypes.STRING,
    },
    opt3:{
      type: DataTypes.STRING,
    },
    opt4:{
      type: DataTypes.STRING,
    },
    ans:{
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  quizs.associate = (models) => {
    // users.belongsTo(models.Todo, {
    //   foreignKey: 'todoId',
    //   onDelete: 'CASCADE',
    // });
  };
  return quizs;
}

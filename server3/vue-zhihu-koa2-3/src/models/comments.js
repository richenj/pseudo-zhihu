module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    creatorId: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    targetId: {
      type: DataTypes.INTEGER
    },
    targetType: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    type: {
      type: DataTypes.INTEGER,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.users, {foreignKey: 'creatorId', as: 'author'});
    Comment.hasMany(models.comments, {foreignKey: 'targetId', as: 'comment'});
    //MY->无需，用props传就行了
    // Comment.belongsTo(models.articles, {foreignKey: 'targetId', as: 'statusA'});
    // Comment.belongsTo(models.questions, {foreignKey: 'targetId', as: 'statusQ'});
    //MY
    Comment.hasOne(models.statuses, {foreignKey: 'targetId', as: 'status'});
  }
  return Comment;
};
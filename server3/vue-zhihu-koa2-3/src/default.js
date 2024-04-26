const config = {
  "db": {
    "database": "test",
    "username": "root",
    "password": "",
    "options": {
      "dialect": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
    },
  },

  "userAttributes": ['name', 'email', 'avatarUrl', 'headline'],
  "commentAttributes": ['creatorId', 'content', 'targetId', 'createdAt'],
  "articleAttributes": ['id', 'title', 'excerpt', 'content', 'cover', 'creatorId', 'type', 'updatedAt'],
  "questionAttributes": ['id', 'title', 'excerpt', 'discription', 'updatedAt'],
  "answerAttributes": ['id', 'content', 'excerpt', 'creatorId', 'type', 'targetId', 'updatedAt'],
};

module.exports = config;
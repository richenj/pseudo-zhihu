const model = require('../models');
const { users: User } = model;

const list1 = async (ctx, next) => {
  const all = await User.findAll({});
  ctx.response.status = 200;
  ctx.response.body = all;
}

const create1 = async (ctx, next) => {
  const create = await User.create({
    name: 'RZ',
    age: 16,
    gender: false,
  });
  ctx.response.status = 201;
  ctx.response.body = create1;
}

module.exports = {
  'GET /': list1,
  'GET /create': create1,
}
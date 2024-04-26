const utils = require('../lib/utils');
const model = require('../models');
const { comments: Comment, statuses: Status} = model;

const {
  userAttributes,
  commentAttributes,
} = require('../default');

const commentInclude = [{
  model: model.users,
  as: 'author',
  attributes: userAttributes,
}, {
  model: model.statuses,
  as: 'status',
  where: {
    targetType: 3,
  },
}, {
  model: model.comments,
  as: 'comment',
  required: false,
  where: {
    targetType: 3,
  }
}];

const getComments = async (ctx, next) => {
  const { targetId, targetType } = ctx.query;
  const where = {
    targetId,
    targetType,
  }
  try {
    await Comment.findAll({
      where,
      include: commentInclude,
      attributes: commentAttributes,
    }).then((res) => {
      ctx.response.body = {
        status: 200,
        list: res,
      };
    })
  } catch (error) {
    utils.catchError(ctx, error);
  }
};

const createComment = async (ctx, next) => {
  console.log("ctx.request.body: ")
  console.log(ctx.request.body)
  const { targetId, targetType, creatorId, content } = ctx.request.body;
  try {
    await Comment.create({
      creatorId,
      targetId,
      content,
      targetType,
      type: 3,
    }).then((res) => {
      return Status.create({
        voteUp: '[]',
        voteDown: '[]',
        favorite: '[]',
        thanks: '[]',
        targetId: res.dataValues.id,
        targetType: 3,
      }).then((res) => {
        console.log(res.dataValues);
        console.log(res.dataValues.id)
        ctx.response.body = {
          status: 201,
          msg: '创建成功'
        }
      })
    })
  } catch (error) {
    utils.catchError(ctx, error);
  }
}

const deleteComment = async (ctx, next) => {
  const { id, creatorId } = ctx.request.body;
  try {
    await Comment.destroy({
      where: {
        id,
        creatorId,
      }
    }).then((res) => {
      return Status.destroy({
        where: {
          targetId: id,
          targetType: 3,
        }
      }).then((response) => {
        ctx.response.body = {
          status: 202,
          msg: '删除成功',
        };
      });
    })
  } catch (error) {
    utils.catchError(error);
  }
}

module.exports = {
  'GET /comments': getComments,
  'POST /comments': createComment,
  'DELETE /comments': deleteComment,
}

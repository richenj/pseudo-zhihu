const _ = require('lodash');
const model = require('../models');
const { answers:Answer, statuses:Status } = model;
const {
  answerAttributes,
  userAttributes,
} = require('../default')

const catchError = (ctx, err) => {
  console.log(err);
  ctx.resError = err;
}

const createAnswer = async (ctx, next) => {
  console.log("ctx.request.body: ")
  console.log(ctx.request.body)
  const { creatorId, targetId, content, excerpt } = ctx.request.body;
  try {
    await Answer.create({
      creatorId,
      targetId,
      content,
      excerpt,
      type: 2,
    }).then((res) => {
      return Status.create({
        voteUp: '[]',
        voteDown: '[]',
        favorite: '[]',
        thanks: '[]',
        targetId: res.dataValues.id,
        targetType: 2,
      }).then((res) => {
        ctx.response.body = {
          status: 201,
          msg: '创建成功'
        }
      })
    });
  } catch (error) {
    catchError(ctx, error);
  }
}

const deleteAnswers = async (ctx, next) => {
  const { answerId, userId } = ctx.request.body;
  const where = {
    id: answerId,
    creatorId: userId
  };
  try {
    const answerExist = await Answer.findOne({where});
    if (answerExist) {
      await Answer.destroy({
        where
      }).then((res) => {
        return Status.destroy({
          where: {
            targetId: answerId,
            targetType: 2,
          }
        }).then((response) => {
          ctx.response.body = {
            status: 202,
            smg: '删除成功'
          };
        });
      });
    } else {
      ctx.response.body = {
        status: 2001,
        msg: '答案不存在或者没有权限',
      }
    }
  } catch (error) {
    catchError(ctx, error);
  }
}

const updateAnswer = async (ctx, next) => {
  const { creatorId, answerId, content, excerpt } = ctx.request.body;
  const where = {
    creatorId,
    id: answerId,
  };
  try {
    const answerExist = await Answer.findOne({where});
    if (answerExist) {
      await Answer.update({
        content,
        excerpt,
      }, {
        where
      }).then((res) => {
        ctx.response.body = {
          status: 201,
          msg: '答案修改成功'
        };
      });
    } else {
      ctx.response.body = {
        status: 2001,
        msg: '答案不存在或者没有权限'
      };
    }
  } catch (error) {
    catchError(ctx, error);
  }
}

//MY
const getAnswerList = async (ctx, next) => {
  const answerInclude = [{
    model: model.users,
    attributes: userAttributes,
    as: 'author'
  }];

  try {
    const order = [
      ['id', 'DESC'],
    ];
    const limit = 10;
    const answerList = await Answer.findAll({
      order,
      limit,
      include: answerInclude,
      attributes: answerAttributes,
    });
    ctx.response.body = {
      status: 200,
      list: answerList,
    }
  } catch (error) {
    utils.catchError(ctx, error);
  }
}

module.exports = {
  'POST /answers': createAnswer,
  'DELETE /answers': deleteAnswers,
  'PUT /answers': updateAnswer,

  'GET /answers/list': getAnswerList,
}
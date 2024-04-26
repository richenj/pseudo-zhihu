const utils = require('../lib/utils');
const model = require('../models');
const { questions:Question, answers:Answer } = model;
const {
  userAttributes,
  questionAttributes,
  answerAttributes,
} = require('../default');

const catchError = (ctx, err) => {
  console.log(err);
  ctx.resError = err;
}

const createQuestions = async (ctx, next) => {
  const {
    discription,
    excerpt,
    title,
    userId
  } = ctx.request.body;
  try {
    await Question.create({
      discription,
      excerpt,
      title,
      creatorId: userId,
      type: 1,
    }).then((res) => {
      ctx.response.body = {
        status: 201,
        msg: '创建成功'
      }
    });
  } catch (error) {
    catchError(ctx, error);
  }
}

const updateQuestions = async (ctx, next) => {
  const {
    questionId,
    content,
    excerpt,
    title,
    userId,
  } = ctx.request.body;
  const where = {
    id: questionId,
    creatorId: userId
  };
  try {
    const questionExist = await Question.findOne({where});
    if (!questionExist) {
      ctx.response.body = {
        status: 2001,
        msg: '问题不存在或者没有权限'
      };
    } else {
      await Question.update({
        discription: content,
        excerpt,
        title,
      }, {
        where
      }).then((res) => {
        ctx.response.body = {
          status: 202,
          msg: '问题修改成功'
        };
      });
    }
  } catch (error) {
    utils.catchError(error);
  }
}

const getQuestion = async (ctx, next) => {
  const { questionId } = ctx.query;

  //第一种方法：分开查询
  const questionWhere = {
    id: questionId
  };
  const questionInclude = [{
    model: model.users,
    attributes: userAttributes,
    as: 'author'
  }];
  
  const answerWhere = {
    targetId: questionId //不是id而是targetId
  };
  const answerInclude = [{
    model: model.users,
    attributes: userAttributes,
    as: 'author'
  }, {
    model: model.statuses,
    as: 'status',
    where: {
      targetType: 2,
    },
  }];

  //第二种方法，直接用questions表关联，查询所有内容
  // const include = [{
  //   model: model.users,
  //   attributes: userAttributes,
  //   as: 'author'
  // }, {
  //   model: model.answers,
  //   as: 'answer',
  //   required: false,
  //   attributes: answerAttributes,
  //   include: [{
  //     model: model.statuses,
  //     as: 'status',
  //     where: {
  //       targetType: 2,
  //     },
  //   }, {
  //     model: model.users,
  //     attributes: userAttributes,
  //     as: 'author',
  //   }]
  // }];

  try {
    //第一种查询方法，分开查询，最后合成结果
    const questionContent1 = await Question.findOne({
      where: questionWhere,
      //MY
      // include: questionInclude,
      attributes: questionAttributes,
    });
    const answerList = await Answer.findAndCountAll({
      where: answerWhere,
      include: answerInclude,
      attributes: answerAttributes,
    });
    // console.log("questionContent1:");
    // console.log(questionContent1);
    console.log("answerList:");
    console.log(answerList);
    const finalData = questionContent1;
    finalData.dataValues.answer = answerList.rows;

    //第二种查询方法，直接使用questions表关联所有内容进行查询
    // const questionContent2 = await Question.findOne({
    //   where: questionWhere,
    //   include: include,
    //   attributes: questionAttributes,
    // });

    ctx.response.body = {
      status: 200,
      content: finalData,
      // content: questionContent2,
    }
  } catch (error) {
    catchError(ctx, error);
  }
}

//MY
const getQuestionList = async (ctx, next) => {
  const questionInclude = [{
    model: model.users,
    attributes: userAttributes,
    as: 'author'
  }];

  try {
    const order = [
      ['id', 'DESC'],
    ];
    const limit = 10;
    const questionList = await Question.findAll({
      order,
      limit,
      include: questionInclude,
      attributes: questionAttributes,
    });
    ctx.response.body = {
      status: 200,
      list: questionList,
    }
  } catch (error) {
    utils.catchError(ctx, error);
  }
}

module.exports = {
  'POST /questions': createQuestions,
  'PUT /questions': updateQuestions,

  'GET /questions': getQuestion,
  'GET /questions/list': getQuestionList,
}
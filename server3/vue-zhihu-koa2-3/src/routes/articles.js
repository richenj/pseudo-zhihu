const _ = require('lodash');
const utils = require('../lib/utils');
const model = require('../models');
const { articles: Article, statuses: Status } = model;
const {
  userAttributes,
  articleAttributes,
} = require('../default')

const catchError = (ctx, err) => {
  console.log(err);
  ctx.resError = err;
}

const articleInclude = [{
  model: model.users,
  attributes: userAttributes,
  as: 'author'
}, {
  model: model.statuses,
  as: 'status',
  where: {
    targetType: 0,
  },
}];

const createArticles = async (ctx, next) => {
  console.log('DB文章创建开始');
  console.log(ctx.request.body);
  const { content, excerpt, title, imgUrl, userId } = ctx.request.body;
  try {
    await Article.create({
      content,
      excerpt,
      title,
      cover: imgUrl,
      creatorId: userId,
      type: 0
    })

    // 简化,仅Article.create
    // .then((res) => {
    //   ctx.response.body = {
    //     status: 201,
    //     msg: '创建成功',
    //   }
    // })

    .then((res) => {
      return Status.create({
        voteUp: '[]',
        voteDown: '[]',
        favorite: '[]',
        thanks: '[]',
        targetId: res.dataValues.id,
        targetType: 0,
      })
      .then((res) => {
        ctx.response.body = {
          status: 201,
          msg: '创建成功',
        }
      })
    });

  }
  //仅显示404，无具体信息。为何utils无法
  // catch (error) {
  //   utils.catchError(error);
  // }
  catch (error) {
    catchError(ctx, error);
  }

  //简化版
  // try {
  //   await Article.create({
  //     title, content, excerpt
  //   }).then((res) => {
  //     ctx.response.status = 201;
  //     ctx.response.body = res;
  //   })
  // } catch (error) {
  //   utils.catchError(error);
  // }
}

const deleteArticles = async (ctx, next) => {
  const { articleId, userId } = ctx.request.body;
  const where = {
    id: articleId,
    creatorId: userId
  };
  try {
    const articleExist = await Article.findOne({where});
    if (articleExist) {
      await Article.destroy({
        where
      }).then((res) => {
        return Status.destroy({
          where: {
            targetId: articleId,
            targetType: 0,
          }
        }).then((response) => {
          ctx.response.body = {
            status: 202,
            msg: '删除成功',
          };
        });
      });
    } else {
      ctx.response.body = {
        status: 2001,
        msg: '文章不存在或没有权限',
      }
    }
  } catch (error) {
    utils.catchError(error);
  }
}

const getArticle = async (ctx, next) => {
  const { articleId } = ctx.query;
  //ctx.params是获取动态路由的,这里前端已经发送参数，后端无需从路由中再自己取参数，拿前端送过来的即可
  // const { articleId } = ctx.params;
  const where = {
    id: articleId
    // id: 24
  };
  console.log("ctx:");
  console.log(ctx);
  console.log("ctx.query:");
  console.log(ctx.query);
  // console.log("ctx.params:");
  // console.log(ctx.params);
  console.log("where:");
  console.log(where)
  try {
    await Article.findOne({
      where,
      include: articleInclude,
      attributes: articleAttributes,
    }).then((res) => {
      ctx.response.body = {
        status: 200,
        content: res,
      }
    })
  }
  catch (error) {
    utils.catchError(error);
  }
}

const getArticleList = async (ctx, next) => {
  try {
    const order = [
      ['id', 'DESC'],
    ];
    const limit = 10;
    const articleList = await Article.findAll({
      order,
      limit,
      include: articleInclude,
      attributes: articleAttributes,
    });
    ctx.response.body = {
      status: 200,
      list: articleList,
    }
  } catch (error) {
    utils.catchError(ctx, error);
  }
}

const updateArticles = async (ctx, next) => {
  const {
    articleId,
    content,
    excerpt,
    title,
    imgUrl,
    userId
  } = ctx.request.body;
  const where = {
    id: articleId,
    creatorId: userId,
  };
  try {
    const articleExist = await Article.findOne({ where });
    if (!articleExist) {
      ctx.response.body = {
        status: 2001,
        msg: '文章不存在或者没有权限'
      };
    } else {
      await Article.update({
        content,
        excerpt,
        title,
        cover: imgUrl
      }, {
        where
      }).then((res) => {
        ctx.response.body = {
          status: 201,
          msg: '文章修改成功'
        };
      });
    }
  } catch (error) {
    utils.catchError(error);
  }
}

module.exports = {
  'POST /articles': createArticles,
  'DELETE /articles': deleteArticles,

  'GET /articles': getArticle,
  'GET /articles/list': getArticleList,
  'PUT /articles': updateArticles
}
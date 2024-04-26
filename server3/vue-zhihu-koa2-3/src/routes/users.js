const _ = require('lodash');
const utils = require('../lib/utils');
const model = require('../models');
const { users: User } = model;
const {
  userAttributes,
} = require('../default')

const catchError = (ctx, err) => {
  console.log(err);
  ctx.resError = err;
}

const list2 = async (ctx, next) => {
  try {
    const list = await User.findAll();
    ctx.response.status = 200;
    ctx.response.body = list;
  } catch (error) {
    catchError(error);
  }
}

const createUser = async (ctx, next) => {
  console.log(`createUser start`);
  console.log(ctx.request.body);
  const { name, pwd, email, } = ctx.request.body;

  //测试：temp可以完成赋值
  // const ctx_temp = {
  //   name: 'abc',
  //   pwd: '123',
  //   email: 'abc@qq.com',
  // }
  // const { name, pwd, email, } = ctx_temp;

  try {
    const infoList = await User.findAll({
      attributes: ['name', 'email'],
    });
    //获取所有用户名
    const nameList = _.map(infoList, item => item.dataValues.name);
    if (_.includes(nameList, name)) {
      ctx.response.status = 203;
      ctx.response.body = {
        msg: '用户名重复，请更换用户名'
      };
      return;
    }
    //获取所有邮箱
    const uniquedEmailList = _.map(infoList, item => item.dataValues.email);
    if (_.includes(uniquedEmailList, email)) {
      ctx.response.status = 203;
      ctx.response.body = {
        msg: '邮箱已存在，请更换邮箱或直接登录'
      };
      return;
    }
    //新增用户操作
    await User.create({
      name, pwd, email
    }).then((res) => {
      ctx.response.status = 201;
      ctx.response.body = res;
    })
  } catch (error) {
    catchError(ctx, error);
  }
}

const loginUser = async (ctx, next) => {
  console.log(`loginUser start`);
  console.log(ctx.request.body);
  
  const { name, pwd } = ctx.request.body;
  const where = {
    name,
    pwd,
  };
  const attributes = ['name', 'id', 'email'];
  try {
    await User.findOne({
      where, attributes
    }).then(res => {
      if (res === null) {
        ctx.response.status = 206;
        ctx.response.body = {
          msg: '用户名或者密码不对，请修改后重新登录',
        };
        return;
      } else {
        utils.setCookies(ctx, res.dataValues);
        ctx.response.status = 200;
        ctx.response.body = res;
      }
    })
  }
  catch (error) {
    utils.catchError(error);
  }
}

const checkLogin = async (ctx, next) => {
  try {
    if(ctx.cookies.get('id')) {
      ctx.response.status = 200;
      ctx.response.body = {
        name: decodeURIComponent(ctx.cookies.get('name')),
      };
    } else {
      ctx.response.status = 202;
    }
  }
  catch (error) {
    utils.catchError(ctx, error);
  }
}

const logout = async (ctx, next) => {
  const cookies = {
    id: ctx.cookies.get('id'),
    name: ctx.cookies.get('name'),
    email: ctx.cookies.get('email'),
  }
  try {
    utils.destroyCookies(ctx, cookies);
    ctx.response.status = 200;
  }
  catch (error) {
    catchError(ctx, error);
  }
}

const getUserInfo = async (ctx, next) => {
  console.log("getUserInfo开始")
  // console.log(ctx)
  console.log(ctx.query)
  console.log(ctx.request.query)
  const { userId } = ctx.request.query;
  // const userId = 0;
  try {
    // console.log("User.findOne开始");
    await User.findOne({
      where: {
        id: userId,
      },
      attributes: userAttributes,
    }).then((res) => {
      ctx.response.body = {
        status: 200,
        content: res,
      };
    });
  } catch (error) {
    catchError(error);
  }
}

const updateUserInfo = async (ctx, next) => {
  const { id, colName, value } = ctx.request.body;
  try {
    await User.update({
      [colName]: value,
    }, {
      where: {
        id
      }
    }).then((res) => {
      ctx.response.body = {
        status: 201,
        content: res,
      }
    });
  } catch (error) {
    utils.catchError(error);
  }
}

module.exports = {
  'GET /users/list': list2,
  'POST /users/create': createUser,
  'POST /users/login': loginUser,

  'GET /users/checkLogin': checkLogin,
  'POST /users/logout': logout,

  'GET /users': getUserInfo,
  'PUT /users': updateUserInfo,
}
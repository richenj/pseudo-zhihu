const _ = require('lodash');

exports.setCookies = (ctx, info) => {
  if(!_.isObject(info)) {
    return false;
  }
  _.forIn(info, (value, key) => {
    ctx.cookies.set(key, encodeURIComponent(value), {
      domain: 'localhost',
      path: '/',
      maxAge: 20*60*60*1000,
      httpOnly: false,
      overwrite: false
    });
  });
}

// exports.getCookies = (ctx) => {
//   if(ctx.cookies.get('username')) {
//     ctx.body = ctx.cookies.get('username')
//   } else {
//     ctx.body = 'Cookie is none'
//   }
// }

exports.destroyCookies = (ctx, info) => {
  if (!_.isObject(info)) {
    return false;
  }
  _.forIn(info, (value, key) => {
    ctx.cookies.set(key, value, {
      maxAge: -1,
    });
  });
}

exports.catchError = (ctx, err) => {
  console.log(err);
  ctx.resError = err;
}
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
// const cors = require('koa2-cors')

//新增
const router = require('koa-router')();
//导入controller middleware，自动完成路由注册
const controller = require('./controller');
//便无须写入下面
// const index = require('./routes/index')
// const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text']
// }))
//替换为koa-body
app.use(koaBody({
  multipart: true,
  strict: false,
  formidable: {
    maxFieldsSize: 20*1024*1024
  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

//新增，controller即router.routes(),注册顺序要在bodyparser后面！
app.use(controller());
//设置跨域（和proxy重复了）
// app.use(cors());
// app.use(cors({
//   origin: function (ctx) {
//     console.log(ctx)
//     if (ctx.url === '/users/create') {
//       return "*"; // 允许来自所有域名请求
//       // return ctx.header.origin;
//     }
//     return 'http://localhost:8080';
//   },
//   methods: ['GET', 'POST'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

//练习a
// app.use(async (ctx, next) => {
//   await next();
//   ctx.response.type = 'text/html';
//   ctx.response.body = '<h1>Hello000, koa2!</h1>';
// });

//练习b
// // add url-route:
// router.get('/index', async (ctx, next) => {
//   ctx.response.body = '<h1>Index</h1>';
// });
// router.get('/hello/:name', async (ctx, next) => {
//   var name = ctx.params.name;
//   ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });
// // add router middleware:
// app.use(router.routes());

//练习c
// router.get('/', async (ctx, next) => {
//   ctx.response.body = `<h1>Index</h1>
//       <form action="/signin" method="post">
//           <p>Name: <input name="name" value="koa"></p>
//           <p>Password: <input name="password" type="password"></p>
//           <p><input type="submit" value="Submit"></p>
//       </form>`;
// });
// router.post('/signin', async (ctx, next) => {
//   var
//     name = ctx.request.body.name || '',
//     password = ctx.request.body.password || '';
//   console.log(`signin with name: ${name}, password: ${password}`);
//   if (name === 'koa' && password === '12345') {
//     ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//   } else {
//     ctx.response.body = `<h1>Login failed!</h1>
//       <p><a href="/">Try again</a></p>`;
//   }
// });

// logger
app.use(async (ctx, next) => {
  //新增
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080")
  // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  // ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")

  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// 问题：TypeError: index.routes is not a function
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

//新增
app.use(router.routes()).use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

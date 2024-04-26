module.exports = {
  chainWebpack: config => {
    //修复HMR
    config.resolve.symlinks(true);
  },
  //设置代理
  devServer: {
    // hot: true,
    // host: 'http://localhost',
    // port: 8080,
    proxy: {
      '/users': {
        // MySQL的，不使用
        // target: 'http://127.0.0.1:3306',
        target: 'http://localhost:3000',
        // target: 'https://www.baidu.com',
        // 是否代理websockets
        // ws: true,
        // 开启反向代理，设置同源，默认false，是否需要改变原始主机头为目标URL
        // changeOrigin: true,
        // MY：同样的地址无必要重写
        // pathRewrite: { '^/users': '/users' },
      },

      //P177
      '/articles': {
        target: 'http://localhost:3000',
      },

      '/imgs': {
        target: 'http://localhost:3000',
      },

      '/questions': {
        target: 'http://localhost:3000',
      },

      '/users': {
        target: 'http://localhost:3000',
      },

      '/answers': {
        target: 'http://localhost:3000',
      },

      '/comments': {
        target: 'http://localhost:3000',
      },
    }
  }
}
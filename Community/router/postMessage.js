module.exports = (app)=>{
   let router = require('koa-router')
   let postMessage = new router()
   const Redis = require('koa-redis')
   let Store = new Redis().client;
   postMessage.get('/postMessage',async (ctx)=>{
     app.socketJson[ctx.query.id].emit('tip','这是消息通知')
      let data = await Store.hget(`id:${ctx.query.id}`,'info')
   })
   app.use(postMessage.routes()).use(postMessage.allowedMethods())
}
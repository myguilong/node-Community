const koa = require('koa')
const app = new koa()
const koaBody = require('koa-body')
const session =  require('koa-generic-session')
const koajwt = require('koa-jwt')
const Redis = require('koa-redis')
const server = require('http').createServer(app.callback())
const socket = require('socket.io')(server)
const cors = require('koa2-cors')
const static = require('koa-static');
app.use(static(__dirname + '/public'));
require('./plugins/db')()
app.use(koaBody({
    extendTypes: ['json', 'form', 'text']
  }))
app.use(session({
    store:Redis({
        port:6379,
        host:'localhost'
    })
}))
app.use(cors({
    origin:ctx=>{
        const whiteList = ['http://localhost:8080','http://localhost:8081','http://127.0.0.1:5500','http://localhost:8082']; //可跨域白名单
        let url = ctx.header.origin;
        if(whiteList.includes(url)){
            return url //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
        }
        return 'http://localhost::3000' //默认允许本地请求3000端口可跨域
        
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))

app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
      		ctx.body = {
                  code:-1,
                  msg:"登陆状态过期"
              }
        }else{
            throw err;
        }
    })
})
app.use(koajwt({
    secret: 'my_token'
}).unless({
path: [/\/login\/*/,/\/category\/list/,/^\/uploads/,/\/foods\/list/,/\/foods\/getSpec/,/\/foods\/detail/,/\/webUser\/register/]
// path: [/\/*/]
}));

app.socketJson={}
let Store = new Redis().client;
socket.on('connection',(sock)=>{
     sock.on('login',data=>{
         app.socketJson[data] = sock
         Store.hmset(`id:${data}`,'info',sock)
     })
     sock.on('disconnect',()=>{
         console.log('断开连接')
     })
})
require('./router/postMessage')(app)
require('./router/login')(app)
require('./router/category')(app)
require('./router/foods')(app)
require('./router/adBanner')(app)
require('./router/webUser')(app)
require('./router/leader')(app)
require('./router/cart')(app)
server.listen(8089,()=>{
    console.log('服务启动')
})
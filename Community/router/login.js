module.exports = (app) =>{
    let router = require('koa-router')
    const secret = 'my_token'
    const Redis = require('koa-redis')
    const nodeMail = require('nodemailer')
    const crypto = require('crypto')
    const config = require('../config/config')
    const managerUser = require('../model/mangerUser')
    const jwt = require('jsonwebtoken');
    const koaJwt = require('koa-jwt')({secret})
    let Store = new Redis().client;
    let login = new router({
        prefix:'/login'
    })
    login.post('/register',async (ctx)=>{
           //后台管理系统注册
          const {code,mail,password} = ctx.request.body
          const data =await Store.hget(`mail:${mail}`,'code')
          if(data){
              if(data==code){
                   const hash = crypto.createHash('md5');
                   hash.update(password);
                   let signPassWord = hash.digest(`hex`);

                   await managerUser.create({
                    mail,password:signPassWord
                   })
                   ctx.body = {
                       code:0,
                       msg:'创建成功'
                   }
              }else{
                ctx.body = {
                    msg:"验证码错误",
                    code:-1
                }
              }
          }else{
              ctx.body = {
                  msg:"验证码错误",
                  code:-1
              }
          }
    })
    login.post('/sendCode',async (ctx)=>{
       const {mail} = ctx.request.body
       let res = await managerUser.findOne({
           mail
       })
       if(res!=null){
           ctx.body={
            code:-1,
            msg:'当前邮箱已经注册，请更换'
           }
           return false
       }
       let data  =await Store.hget(`mail:${mail}`,'exprie')
       let  time = new Date().getTime()
       if(data && time<data){
           ctx.body = {
               code:-1,
               msg:"验证码已经发送过.."
           }
           return false
       }
       let transporter = nodeMail.createTransport({
        service: 'qq',
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass
        }
      })
      let ko = {
        code: config.smtp.code(),
        exprie: config.smtp.expire(),
        email:mail
      }
      let mailOptions = {
        from: `"认证邮件" <${config.smtp.user}>`,
        to: ko.email,
        subject: '注册码',
        html: `<h1>您的邀请码是${ko.code}</h1>`
      }
        await transporter.sendMail(mailOptions, (error, next) => {
        if (error) {
          return console.log(error)
        } else {
          Store.hmset(`mail:${ko.email}`, 'code', ko.code, 'exprie', ko.exprie, 'email', ko.email)
          //发送成功配置redis
        }
      })
      ctx.body = {
        code: 0,
        msg: '发送成功,可能会有延迟'
      }

    })
    login.post('/signIn',async (ctx)=>{
       const {mail,password} = ctx.request.body
       const hash = crypto.createHash('md5');
       hash.update(password);
       let signPassWord = hash.digest(`hex`);
        console.log(signPassWord.toString())
       const res = await managerUser.findOne({mail,password:signPassWord})
       if(res!==null){
          const token = jwt.sign({
              name:res.mail,
              _id:res._id
          },'my_token',{expiresIn:'24h'})
          ctx.body = {
              code:0,
              data:token,
              userMail:res.mail,
              msg:'登录成功'
          }
       }else{
           ctx.body = {
               code:-1,
               data:null,
               msg:"用户名或密码错误"
           }
       }
    })
    login.get('/getUser',koaJwt,async ctx=>{
       ctx.body = {
         code:0,
         data:ctx.state.name
       }
    })
    login.get('/list',async ctx=>{
       //返回系统注册人员列表
       let res = await managerUser.find();
       console.log(res)
       ctx.body = {
         code:0,
         data:res
       }
    })
    //获取用户的权限
    login.get('/permission',koaJwt,async ctx=>{
        console.log(ctx.state)
    })
    app.use(login.routes()).use(login.allowedMethods())

}

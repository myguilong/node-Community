module.exports = (app)=>{
    const secret = 'my_token'
    const user = require('../model/user')
    const router = require('koa-router')
    const multer = require('koa-multer')
    const crypto = require('crypto')
    const jwt = require('jsonwebtoken');
    const kjwt = require('koa-jwt')({secret})
    const fs = require('fs')
    fs.exists('./public/uploads/userHead',(exits)=>{
          exits?null:fs.mkdir('./public/uploads/userHead',()=>{})
    })
    var storage = multer.diskStorage({
        //文件保存路径
        destination: function (req, file, cb) {
          cb(null, 'public/uploads/userHead')
        },
        //修改文件名称
        filename: function (req, file, cb) {
          var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
          cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
      })
     let upload = multer({ storage: storage });
    const webUser = new router({
        prefix:"/webUser"
    })
    webUser.post('/register',upload.single('userHead'),async ctx=>{
        //注册接口
         let userHeader = ctx.req.file.filename
         const {name,password,mail} = ctx.req.body
         let hash = crypto.createHash('md5');
         hash.update('webServer');
         let signPassWord = hash.digest(`${password}`);
         let aerr = null //用于处理错误信息
          try {
            let res = await user.create({ name, password:signPassWord,mail,userHeader })
                ctx.body = {
                    code:0,
                    msg:'注册成功'
                }
       
          } catch (error) {
              ctx.body = {
                code:-1,
                msg:'注册失败'
            }
          }
 
    })
    webUser.post('/login',async ctx=>{
         const {mail,password} = ctx.request.body
         //对密码进行加密
         const hash = crypto.createHash('md5');
         hash.update('webServer');
         let signPassWord = hash.digest(`${password}`);
         //对传来的值进行加密
         const res = await user.findOne({mail,password:signPassWord})
         const token = jwt.sign({
            name:res.mail,
            _id:res._id,
            userName:res.name,
             userHeader:res.userHeader
        },'my_token',{expiresIn:'24h'})
         if(res){
             ctx.body = {
                 code:'',
                 data:token,
                 msg:'登录成功'
             }
         }else{
             ctx.body = {
                 code:'',
                 msg:'未注册'
             }
         }

    })
    webUser.get('/userInfo',kjwt,async ctx=>{
        ctx.body = {
            code:0,
            data:ctx.state
        }
    })
    webUser.get('/list',async ctx=>{
        let {pageNum} = ctx.query;
        let res = await new Promise((resolve, reject) => {
            user.countDocuments({},(err,count)=>{
                let page = Math.ceil(count/8)
                if(pageNum>page){
                    resolve({is:false})
                }else{
                    user.find().skip((pageNum-1)*8).limit(8).exec((err,doc)=>{
                        resolve({is:true,doc,allLength:count})
                    })
                }
            })
        })
        const {is,doc,allLength} = res
        is?ctx.body = {
            msg:'查询成功',
            code:0,
            data:{
                arr:doc,
                allLength,
                msg:'查询成功'
            }
        }:ctx.body = {
            code:-1,
            msg:'获取失败'
        }
    })
    app.use(webUser.routes()).use(webUser.allowedMethods())
}
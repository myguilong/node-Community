//操作首页广告和链接
module.exports = (app) => {
    const Router = require('koa-router')
    const adBannerMode = require('../model/adBanner')
    const multer = require('koa-multer')
    const fs = require('fs')
    fs.exists('./public/uploads/adBanner', exists => {
        exists?null:fs.mkdir('./public/uploads/adBanner',()=>{})
    })
    var storage = multer.diskStorage({
        //文件保存路径
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/adBanner')
        },
        //修改文件名称
        filename: function (req, file, cb) {
            var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    //加载配置
    let upload = multer({
        storage: storage
    });
    const adbanner = new Router({
        prefix: '/adBanner'
    })
    adbanner.get('/list', async ctx => {
        let arr = await adBannerMode.find()
        ctx.body = {
            data: arr,
            code: 0
        }
    })
    adbanner.post('/create', upload.single('bg'), async ctx => {
        await adBannerMode.create({
            bgImg: ctx.req.file.filename
        })
        ctx.body = {
            code: 0,
            msg: '添加广告成功'
        }
    })
    adbanner.post('/remove', async ctx => {
        const {
            id
        } = ctx.request.body
        await adBannerMode.findByIdAndRemove(id)
        ctx.body = {
            code: 0,
            msg: '删除成功'
        }
    })

    app.use(adbanner.routes()).use(adbanner.allowedMethods())
}
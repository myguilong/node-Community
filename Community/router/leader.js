module.exports = (app)=>{
    const Router = require('koa-router')
    const leader = require('../model/Leader')
    const router = new Router({
        prefix:"/leader"
    })
    router.get('/list',async ctx=>{
        let result = await  leader.find({isNow:true})
        ctx.body = {
            code:0,
            data:result
        }
    })
    router.get('/apply',async ctx=>{
        let result = await leader.find({
            isNow:false
        })
        ctx.body = {
            code:0,
            data:result
        }
    })
    router.get('/nearLeader',async ctx=>{
        const {longitude,latitude} = ctx.query
        let res = await leader.aggregate([
            {
                $geoNear:{
                    near:{
                        type:'Point',
                        coordinates:[
                            parseFloat(longitude),parseFloat(latitude)
                        ]
                    },
                    distanceField:'distance',
                    spherical:true,
                    maxDistance:1000000000
                }
            }
        ])
        res = await leader.populate(res,{"path":'userId'})
        let arr = res.map(item=>{
            return {
                name:item.name,
                address:item.address,
                userId:{
                    mail:item.userId.mail,
                    name:item.userId.name,
                    userHeader:item.userId.userHeader,
                    _id:item.userId._id
                },
                phone:item.phone,
                distance:item.distance>1000?(Math.round(item.distance/100)/10).toFixed(1)+'公里':Math.floor(item.distance)+'米',
                _id:item._id,
            }
        })
        ctx.body = {
            code:0,
            data:arr
        }
    })
    router.post('/create',async ctx=>{
        //需要接收用户表的团长信息
        //还需要判断是否已经有申请了
        const {name,address,longitude,latitude,asaddress,phone,userId} = ctx.request.body
        let arr = await leader.find({
            userId
        })
        if(arr.length!=0){
            ctx.body = {
                code:-1,
                msg:'当前已经提交过申请不能再提交'
            }
        }else{
            await  leader.create({name,address,phone,asaddress,location:[longitude,latitude],userId})
            ctx.body = {
                msg:"提交申请团长成功,待审核",
                code:0
            }
        }
    })
    router.post('/passLeader',async ctx=>{
         //筛选通过团长
         const { id } = ctx.request.body
         await leader.findByIdAndUpdate(id,{
             isNow:true
         })
         ctx.body={
             code:0,
             msg:'筛选成功'
         }
    })
    router.post('/revoke',async ctx=>{
        const {id} = ctx.request.body
        await leader.findByIdAndUpdate(id,{
            isNow:false
        })
        ctx.body = {
            code:0,
            msg:'撤销成功'
        }
    })
    app.use(router.routes()).use(router.allowedMethods())
}
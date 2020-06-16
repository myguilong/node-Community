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
        const res = await leader.aggregate([
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
                    maxDistance:10000
                }
            }
        ])
        let arr = res.map(item=>{
            return {
                name:item.name,
                address:item.address,
                headImg:item.headImg,
                city:item.city,
                phone:phone,
                distance:item.distance>1000?(Math.round(item.distance/100)/10).toFixed(1)+'公里':item.distance+'米'
            }
        })
        ctx.body = {
            code:0,
            data:arr
        }
    })
    router.post('/create',async ctx=>{
        //需要接收用户表的团长信息
        const {name,address,longitude,latitude,asaddress,phone,userId} = ctx.request.body
        await  leader.create({name,address,phone,asaddress,location:[longitude,latitude],userId})
        ctx.body = {
            msg:"提交申请团长成功,待审核",
            code:0
        }
    })
    app.use(router.routes()).use(router.allowedMethods())
}
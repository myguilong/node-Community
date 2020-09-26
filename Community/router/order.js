module.exports = (app)=>{
    const Router = require('koa-router')
    const carts = require('../model/cart')
    const order = require('../model/order')
    const foods = require('../model/foodsDetail')
    const router = new Router({
        prefix:'/order'
    })
    router.post('/create',async ctx=>{
        //创建订单,此处应该能生成单独个一个商品订单
        const {foodsId} = ctx.request.body
        console.log(foodsId)

    })
    app.use(cart.routes()).use(cart.allowedMethods())
}
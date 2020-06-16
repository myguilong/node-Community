module.exports = (app)=>{
    const Router = require('koa-router')
    const carts = require('../model/cart')
    const order = require('../model/order')
    const cart = new Router({
        prefix:'/cart'
    })
    cart.post('/create',async  ctx=>{
        //创建购物车
        const {foodsID,userID} = ctx.request.body
        //还需要接收
        //去查询是否存在这个商品

        let res = await  carts.findOne({
            foods:foodsID,userId:userID
        })

        if(res){
            //如果已经有了商品
            let number = res.number + 1
 
            //更新后的商品数
            await carts.findByIdAndUpdate(res._id, {
                number
            })
            ctx.body = {
                code: 0,
                msg: '添加成功'
            }
        }else{
             await  carts.create({foods:foodsID,userId:userID})
            ctx.body={
                 code:0,
                 msg:'添加成功'
            }
        }
    })
    cart.get('/list',async  ctx=> {
        const {userID} = ctx.query
        const res = await carts.find({userId: userID}).populate({path: 'foods'})
        let arr = res.map(item => item.foods)
        let number = res.map(item => item.number)
        let newArr = arr.map((item, index) => {

        })
        ctx.body = {
            code: 0,
            data: arr
        }
    })
    cart.post('/reduce',async ctx=>{
        const {foodsID,userID} = ctx.request.body
        let {_id,number} = await  carts.findOne({foods:foodsID,userId:userID})
        if(number==1){
            ctx.body = {
                code:0,
                msg:'商品数量已经为0'
            }
        } else {
            await carts.findByIdAndUpdate(_id, {
                number: number - 1
            })
            ctx.body = {
                code: 0,
                msg: '减少成功'
            }
        }

    })
    cart.get('/number', async ctx => {
        //获取用户已有的购物车商品数量
        const {userId} = ctx.request.body
    })
    cart.post('/remove', async ctx => {
        const {userID, foodsID} = ctx.request.body
        try {
            await carts.findOneAndRemove({
                userId: userID, foods: foodsID
            })
            ctx.body = {
                code: 0,
                msg: '删除成功'
            }
        }catch(e) {
        
            ctx.body = {
                code:-1,
                msg:'删除失败'
            }
        }

    })

    app.use(cart.routes()).use(cart.allowedMethods())
}
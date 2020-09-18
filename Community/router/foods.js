module.exports = (app)=>{
    const Router = require('koa-router')
    const foodDetail = require('../model/foodsDetail')
    const multer = require('koa-multer')
    const specification = require('../model/specifications')
    const fs = require('fs')//引入文件模块做删除商品的时候做删除图片使用
    const utils = require('../utils/utils')
    const Foods = new Router({
        prefix:"/foods"
    })
    let hasFolied = fs.existsSync("./public/uploads/foodsDetail")
    hasFolied?null:fs.mkdir('./public/uploads/foodsDetail',()=>{})

    let storage = multer.diskStorage({
        //文件保存路径
        destination: function (req, file, cb) {
          cb(null, 'public/uploads/foodsDetail')
        },
        //修改文件名称
        filename: function (req, file, cb) {
          let fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
          cb(null,Date.now().toString() +Math.floor(Math.random()*100).toString()+"." + fileFormat[fileFormat.length - 1]);
        }
      })
      //加载配置
      let upload = multer({ storage: storage });
      let cpUpload = upload.fields([{ name: 'banner', maxCount: 5 }, { name: 'detailImg', maxCount: 8 },{name:'specificationImg',maxCount:3}])
      Foods.post('/create',cpUpload,async ctx=>{
          //创建商品
          const {foodsName,foodsText,foodsPrice,foodsCategory,foodsOldPrice,foodsSpecifications,foodsDelivery,foodsInnerhtml,number,buyName,form,Supplier,accumulate,specification:postSpec} = ctx.req.body
           const bannerImg = ctx.req.files.banner.map(item=>{
            return item.filename
          })
          const detailImg = ctx.req.files.detailImg.map(item=>{
            return item.filename
          })
          const createFoodsres = await foodDetail.create({
            foodsName,foodsText,foodsPrice,foodsOldPrice,foodsCategory,foodsSpecifications,foodsDelivery,foodsInnerhtml,number,buyName,form,Supplier,accumulate,
            foodsBanner:bannerImg,foodsImgList:detailImg,
              hasSpecification:postSpec?true:false
          })
          console.log(createFoodsres)
          if(postSpec){
              let speciImgArr = ctx.req.files.specificationImg.map(item=>{
                  return item.filename
              })
              let specArr = postSpec.map(item=>JSON.parse(item))

              for(let i=0;i<specArr.length;i++){
                  await specification.create({
                      specImg:speciImgArr[i],
                      specName:specArr[i].specName,
                      specPrice:specArr[i].money,
                      specStock:specArr[i].number,
                      fromFoodsId:createFoodsres._id
                  })
              }
              // await specification.create({
              //     fromFoodsId:createFoodsres._id,
              //     specifArry:postSpec
              // })
          }
          ctx.body = {
            code:0,
            msg:'添加成功'
          }
          
      })
      Foods.get('/list',async ctx=>{
        const {category} = ctx.query
        let  result = category? await foodDetail.find({foodsCategory:category}):await foodDetail.find().populate({path:'foodsCategory'})
        ctx.body = {
          code:0,
          data:result
        }
      })
      Foods.get('/detail',async ctx=>{
          const {id} = ctx.query
          if(!id){
            ctx.body={code:-1,msg:"未传入参数"} 
            return 
          }
          let result = await foodDetail.findById(id).populate({path:'foodsCategory'}) 
          if(result.hasSpecification){
              //如果这个商品是存在规格的
              let specRes = await specification.findOne({fromFoodsId:result._id})

              ctx.body = {
                  code:0,
                  data:result,
                  spec:specRes
              }
          }else{
            ctx.body = {
                code:0,
                data:result,
                spec:false

            }
          }
      })
     Foods.post('/delete',async ctx=>{
            //先获取所有的商品数据
            let {id} = ctx.request.body
            let res = await  foodDetail.findById(id)
            let banner = res.foodsBanner
            let foodsImgList = res.foodsImgList
            let arr = [...banner,...foodsImgList]
            if(arr.length>0){
                for(let i=0;i<arr.length;i++){
                    fs.unlink(`./public/uploads/foodsDetail/${banner[i]}`,(err)=>{
                        if(err)console.log(err)
                    })
                }
            }
            await  foodDetail.findByIdAndDelete(id)
            ctx.body = {
                code:0,
                msg:'删除成功'
            }
    })
    Foods.get('/getSpec',async ctx=>{
        //返回对应商品的规格
        const {id} = ctx.query
        const res = await specification.find({
            fromFoodsId:id
        })
        ctx.body = {
            code:0,
            data:res,
            res:'返回信息成功'
        }
    })
    Foods.post('/update',cpUpload,async ctx=>{
        //更新商品详情
        //接口需要接收他未删除的图片的地址,再拿接收到的图片地址合并进去
        const {
            foodsName,foodsText,foodsPrice,foodsCategory,foodsOldPrice,
            foodsSpecifications,foodsDelivery,foodsInnerhtml,number,buyName,
            form,Supplier,accumulate,specification:postSpec,oldBannerimgList,oldFoodsimgList,_id} = ctx.req.body
        let bannerImg = []
        let detailImg = []
        if(ctx.req.files.banner){
             bannerImg = ctx.req.files.banner.map(item=>{
                return item.filename
            })
        }
        if(oldBannerimgList){
            if(utils.isArray(oldBannerimgList)){
                bannerImg=[...oldBannerimgList,...bannerImg]
            }else{
                bannerImg=[oldBannerimgList,...bannerImg]
            } 
        }
        if(ctx.req.files.detailImg){
            detailImg = ctx.req.files.detailImg.map(item=>{
                return item.filename
            })
        }
        if(oldFoodsimgList){
            if(utils.isArray(oldFoodsimgList)){
                detailImg=[...oldFoodsimgList,...detailImg]
            }else{
                detailImg=[oldFoodsimgList,...detailImg]
            }
        }
       let updateRes = await foodDetail.findByIdAndUpdate(_id,{
            foodsName,foodsText,foodsPrice,foodsOldPrice,foodsCategory,foodsSpecifications,foodsDelivery,foodsInnerhtml,number,buyName,form,Supplier,accumulate,
            foodsBanner:bannerImg,foodsImgList:detailImg,
            hasSpecification:postSpec?true:false
        })
        //先去查找他是否有商品规格
        let specRes = await  specification.findOne({
            fromFoodsId:_id
        })
        if(specRes){
            if(postSpec){
                //如果修改了规格
                await specification.findByIdAndUpdate(specRes._id,{
                    specifArry:postSpec
                })
            }
        }else{
            if(postSpec){
                //如果是新添加规格
                await specification.create({
                    fromFoodsId:updateRes._id,
                    specifArry:postSpec
                })
            }
        }
        ctx.body = {
            code:0,
            msg:'修改成功'
        }
    })
    app.use(Foods.routes()).use(Foods.allowedMethods())
}
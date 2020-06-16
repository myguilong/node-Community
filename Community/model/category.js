//商品分类
const mongoose = require('mongoose')
const Schmea = mongoose.Schema;
const category = new Schmea({
      categoryName:{
          type:String,
          required:true,
          unique:false
      },
      categoryIcon:{
          type:String,
          required:true
      },
      showInIndex:{
          type:Boolean,
          default:false
          //是否在客户端首页展示
      },
      isPopular:{
          type:Boolean,
          default:false,
          //是否热门
      }
})
module.exports = mongoose.model('category',category)
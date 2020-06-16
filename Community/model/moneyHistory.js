const mongoose  = require('mongoose')
const Schema = mongoose.Schema;
const leader = require('mongoose')
const moneyHistory = new Schema({
   time:{
       type:Date
   },
   changeMoney:{
       type:String
   },
   nowMoney:{
       type:String
   },
   user:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'leader'
   },
   des:{
       //描述
       type:String
   },
   form:{
    //来自谁的订单
       type:mongoose.SchemaTypes.ObjectId,
       ref:'user'
   }
})
module.exports = mongoose.model('moneyHistory',moneyHistory)
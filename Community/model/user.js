const mongoose = require('mongoose')
const leader = require('./Leader')
const Schema = mongoose.Schema;
const user = new Schema({
   name:{
       type:String,
       required:true
   },
   mail:{
       type:String,
       required:true,
       unique:true
   },
   password:{
       type:String
   },
   userHeader:{
       //用户头像
       type:String
   },
   money:{
       type:Number,
       default:500
   },
   headerInfo:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'leader'
   }


})
module.exports = mongoose.model('user',user)
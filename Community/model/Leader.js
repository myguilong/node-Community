
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const user = require('./user')
const leader = new Schema({
   name:{
       type:String,
       required:true
   },
    headImg:{
       type:String
    },
   address:{
       type:String,
       required:true
   },
   location:{
    type:[Number],
    index:{
        type:'2dsphere',
        sparse:true
    }
   },
   asaddress:{
       type:String
   },
   phone:{
       type:Number
   },
    userId:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'user'
    },
    isNow:{
       //审核
        type:Boolean,
        default:false
    }

})
module.exports = mongoose.model('leader',leader)
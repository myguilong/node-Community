//规格
const mongooose = require('mongoose')
const Schmea = mongooose.Schema;
const specification = new Schmea({
    fromFoodsId:{
        //所属商品的id,
        type:mongooose.SchemaTypes.ObjectID,
        ref:'foodsDetail'
    },
    // specifArry:{
    //     type:Array
    // }
    specName:{
        type:String,
        required:true
    },
    specImg:{
        //这个规格的图片
        type:String
    },
    specPrice:{
        //这个规格的价格
        type:Number
    },
    specStock:{
        //规格库存
        type:Number
    }
})
module.exports = mongooose.model('specification',specification)
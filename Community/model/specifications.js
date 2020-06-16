//规格
const mongooose = require('mongoose')
const Schmea = mongooose.Schema;
const specification = new Schmea({
    fromFoodsId:{
        //所属分类的id,
        type:mongooose.SchemaTypes.ObjectID,
        ref:'foodsDetail'
    },
    specifArry:{
        type:Array
    }
})
module.exports = mongooose.model('specification',specification)
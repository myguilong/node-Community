const mongoose = require('mongoose')
const Schema = mongoose.Schema
const order = new Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectID,
        ref:'user'
    },
    foodsList:{
        type:Array
    },
    Date:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('order',order)
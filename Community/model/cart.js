const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const user = require('../model/user')
const foodsDetail = require('../model/foodsDetail')
const carts = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: 'user'
    },
    number: {
        type: Number,
        default:1
        //购物车商品数量
    },
    foods: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: "foodsDetail"
    }
})
module.exports = mongoose.model('carts', carts)
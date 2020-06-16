//首页广告
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adBanner = new Schema({
    bgImg:{type:String}
})
module.exports = mongoose.model('adBanner',adBanner)
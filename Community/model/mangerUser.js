const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const managerUser = new Schema({
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    registerTime:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('managerUser',managerUser)
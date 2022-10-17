const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:String,
    category:String,
    company:String,
    price:String,
    owner:String,
    image:String
})  

module.exports = mongoose.model('products',ProductSchema)
const mongoose = require('mongoose')

const ProductsSchema  = new mongoose.Schema(
    {
        Name:String,
        Brand:String,
        Category:String,
        Price:Number
    }
)

module.exports = mongoose.model('products',ProductsSchema)
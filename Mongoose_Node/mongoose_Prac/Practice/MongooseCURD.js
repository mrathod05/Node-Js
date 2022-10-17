const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/E-comm')

const ProductsSchema = new mongoose.Schema({
    Name:String,
    Brand:String,
    Category:String,
    Price:Number
})

const SaveinDb = async()=>{
    const Products = mongoose.model('products',ProductsSchema)
    let data = new Products({Name:"13 Pro",Brand:"iPhone",Category:"Mobile",Price:55000})
    let result = await data.save()
    console.log(result)
}

const UpdateInDB = async()=>{
    const Products = mongoose.model('products',ProductsSchema)
    let data = await Products.updateOne(
        {Name:"13 Pro"},
        {
            $set:{Price:56000}
        }
    )
}

const DeleteInDB = async()=>{
    const Products = mongoose.model('products',ProductsSchema)
    let data = await Products.deleteOne(
            {Name:"M10"}
        )
}
//DeleteInDB()

const findInDB = async()=>{
    const Products = mongoose.model('products',ProductsSchema)
    let data = await Products.find()
    console.log(data)
}
//findInDB()
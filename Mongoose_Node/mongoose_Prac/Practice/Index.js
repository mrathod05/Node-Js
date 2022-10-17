const express = require('express')
const multer = require('multer')
//const  mongodb = require('mongoose')
//require('./Confing')
//const Products = require('./Products')

const app = express()
//app.use(express.json())

// app.post('/create',async(req,res)=>{

//     let data = new Products(req.body)
//     let result = await data.save()
//     console.log(result)
//     res.send(result)
// })

// app.get('/get',async(req,res)=>{
//     let data = await Products.find()
//     console.log(data)
//     res.send(data)
// })

// app.delete('/delete/:_id',async(req,res)=>{
//     console.log(req.params)
//     let data = await Products.deleteOne(req.params)
//     res.send(data)
// })

// app.put('/update/:_id',async(req,res)=>{
//     console.log(req.params)
//     let data = await Products.updateOne(
//         req.params,
//         {
//             $set:req.body
//         }
//     )
//     res.send(data)
// })

// app.get('/search/:key',async(req,res)=>{//search from the postman
//     console.log(req.params.key)
//     let data = await Products.find(
//         {
//             $or:[
//                 {"Name":{$regex:req.params.key}},
//                 {"Category":{$regex:req.params.key}},
//                 //{"Price":{$regex:req.params.key}}
//             ]
//         }
//     )
//    res.send(data)
// })

// const upload = multer({
//     storage: multer.diskStorage({
//         destination:(req,file,cb)=>{
//             cb(null,"Uploads")
//         },
//         filename:(req,file,cb)=>{
//             cb(null,file.fieldname+"_"+Date.now()+".jpg")
//         }
//     })
// }).single("user_file")

// app.post('/multer',upload,(req,res)=>{
//     res.send("File Uploaded")
// })



app.listen(2006)
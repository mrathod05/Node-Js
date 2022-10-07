const express = require('express')
const app = express()
const dbConnect = require('./MongoDB')
const mongodb = require('mongodb')
app.use(express.json())

app.get('/',async(req,res)=>{
    let data = await dbConnect()
    data = await data.find().toArray()
    console.log(data)
    res.send(data)
})

app.post('/',async(req,res)=>{

    let data = await dbConnect()
    let result = await data.insertOne(req.body)
    res.send(req.body)
})

app.put('/',async(req,res)=>{
let data = await dbConnect()
let result = await data.updateOne(
    {name:req.body.name},
    {$set:req.body}
)
res.send(result)
})

app.delete('/:id',async(req,res)=>{
    console.log(req.params.id)
    let data = await dbConnect()
    let result = await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    res.send(result)
}
)

app.listen(2006)
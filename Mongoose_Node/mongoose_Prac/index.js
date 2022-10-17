const express = require('express')
const cors = require('cors')
const multer = require('multer')
require('./DB/Config')
const Users = require('./DB/User')
const Image = require('./DB/Image')
const Jwt = require('jsonwebtoken')
const JwtKey = 'E-commm'
const Products = require('./DB/Product')
const Product = require('./DB/Product')
//const User = require('./DB/User')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('Uploads'))


 const upload = multer({
     storage: multer.diskStorage({
         destination:(req,file,cb)=>{
             cb(null,"./DB/Uploads")
         },
         filename:(req,file,cb)=>{
             cb(null,Date.now()+"_"+file.originalname)
         }
     })
 }).single("image")//multer file upload function

 app.post(`/Upp`,upload,async (req, res) => {
    let data={...req.body,image:req.file.filename}
    let product = new Product(data)
    let result = await product.save()
    console.log(result)
    res.send(result)
})




app.post(`/addP`,verifyToken, async (req, res) => {
    let data = req.body
    let product = new Products(data)
    let result = await product.save()
    console.log(result)
    res.send(result)
})

app.post('/register', async (req, res) => {

    let User = new Users(req.body)
    let result = await User.save()
    result = result.toObject()
    delete result.password
    Jwt.sign({ result }, JwtKey, { expiresIn: '2h' }, (err, tokan) => {
        if (err) {
            res.send({ resresultult: "Somthins went wrong" })
        }
        res.send({ result, auth: tokan })
    })
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    if (req.body.email && req.body.password) {
        let user = await Users.findOne(req.body).select('-password')
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: '2h' }, (err, tokan) => {
                if (err) {
                    res.send({ result: "Somthins went wrong" })
                }
                res.send({ user, auth: tokan })
            })
        }
        else {
            res.send({ result: "Somthind wrong" })
        }
    } else {
        res.send({ result: "user not found" })
    }

})

app.get('/products',verifyToken, async (req, res) => {
    let products = await Products.find()
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "NO data found" })
    }
})
app.get('/owner/:key',verifyToken, async (req, res) => {
    let key = req.params.key
    let Owner = await User.findById(key)
    console.log(Owner)
    if (Owner) {
        res.send(Owner)
    } else {
        res.send({ result: "NO User found" })
    }
})

app.delete('/products/:id',verifyToken, async (req, res) => {
    const _id = req.params.id
    try {
        let result = await Products.findByIdAndDelete(_id)
        if (!result) {
            return res.sendStatus(404)
        }
        res.send(result)
    } catch (e) {
        res.sendStatus(400)
    }
})

app.get('/products/:id',verifyToken, async (req, res) => {
    let result = await Products.findOne({ _id: req.params.id })
    if (!result) {
        return res.sendStatus(404)
    }
    res.send(result)
})

app.put('/products/:id',verifyToken, async (req, res) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })
    if (!result) {
        return res.sendStatus(404)
    }
    res.send(result)
})

app.get('/search/:key',verifyToken, async (req, res) => {
    let result = await Products.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { userId: { $regex: req.params.key } }
        ]
    })
    res.send(result)
})

// app.get('/agg',verifyToken,async(req,res)=>{
//     let data = await Users.aggregate([{$lookup:{from:'products',localField:'_id',foreignField:'owner',as:'Owner'}},{$project:{'_id':0,'name':1}}])
//     let result = data
//     console.log(result)
//     if (result) {
//         res.send(result)
//     } else {
//            res.send({ result: "NO data found" })
//     }
// })

function verifyToken(req,res,nxt){
        let token = req.headers['authorization']

        if(token){
            token = token.split(' ')[1] 
            Jwt.verify(token,JwtKey,(err,velid)=>{
                if(err){
                    console.log(token)
                    return res.status(401).send("Please try again")
                }
                else{
                    nxt()
                }
            })
        }else{
            res.send("Please enter valide token")
        }
    }


app.listen(2006)
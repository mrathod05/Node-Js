const express = require('express')
const multer = require('multer')

const app = express()


const upload = multer({
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"Uploads")
        },
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+"_"+Date.now()+".jpg")
        }
    })
}).single("user_file")

app.post('/multer',upload,(req,res)=>{
    res.send("File Uploaded")
})

app.listen(2006)
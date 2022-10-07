{//const fs = require('fs')
//const path =require('path')
//const dirPath=path.join(__dirname,'files')
//const dirPath=path.join(__dirname,'crud')
//const filePath=`${dirPath}/apple.txt`
// for(i=0; i<=5;i++)
// {
//     fs.writeFileSync(dirPath+`/apple${i}.txt`,'this is a apple file')
// }

// fs.readdir(dirPath,(err,files)=>{

//     files.forEach((items)=>{
//         console.log(items);
//     })
// })

//fs.writeFileSync(filePath,'This is simple text file')
// fs.readFile(filePath,'utf8',(err,items)=>{
//     console.log(items);
// })

// fs.appendFile(filePath,'and file name is apple.text',(err)=>{
//     if(!err)console.log("file is updated");
// })
// fs.rename(filePath,`${dirPath}/fruits.txt`,(err)=>{
//     if(!err)console.log("filename is updated");
// })
//fs.unlinkSync(`${dirPath}/fruits.txt`)
}

// const express = require('express')
// const path = require('path')

// const app=express()
// const PublicPath=path.join(__dirname,'public')

// app.set('view engine','ejs')

// app.get('',(_,res)=>{
//     res.sendFile(`${PublicPath}/index.html`)
// })

// app.get('/about',(_,res)=>{
//     res.sendFile(`${PublicPath}/About.html`)
// })

// app.get('/help',(_,res)=>{
//     res.sendFile(`${PublicPath}/Help.html`)
// })

// app.get('/profile',(_,res)=>{
//         const user={
//             name:'Meet Rathod',
//             email:'meet@test.com',
//             city:'India',
//             skills:['php','java','C++','C','Python']
//         }
//     res.render('profile',{user})
// })

// app.get('/login',(_,res)=>{
//     res.render('login')
// })

// app.listen(2006)

const express= require('express');
const reqFilter= require('./Middleware')
const app=express()



// app.use(reqFilter) Middllware for all routes

app.get('/',(req,res)=>{
    res.send('Welcome to home page')
})

app.get('/users',reqFilter,(req,res)=>{
    res.send('Welcome to users page')
})

app.listen(2006)

























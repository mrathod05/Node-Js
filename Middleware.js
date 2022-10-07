module.exports=reqFilter= (req,res,next)=>{
    
    if(!req.query.age){
        res.send('Please porvide age')
    }else if(req.query.age>18){
        res.send('you can not access this page')
    }
    next()
      
}
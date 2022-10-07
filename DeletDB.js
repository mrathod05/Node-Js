const dbConnect = require('./MongoDB')


const deletDB = async()=>{

    let data = await dbConnect()
    let result = await data.deleteOne({Name:'V10'})
    console.warn(result)
}

deletDB()

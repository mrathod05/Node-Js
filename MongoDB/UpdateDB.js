const dbConnect = require('./MongoDB')

const UpdateDB = async()=>{
    let data = await dbConnect()
    let result = await data.updateOne(
        {Name:'Nokia 110'},
        { $set: {Price: 25000}
    }
    )
    console.log(result)
}

UpdateDB()  
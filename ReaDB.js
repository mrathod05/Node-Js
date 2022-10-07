
const dbConnect = require('./MongoDB');

const main = async()=>{
    let data =  await dbConnect()
    data =  await data.find({Name:"S10"}).toArray()
    console.log(data)
}
main()
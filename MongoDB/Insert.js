const dbConnect= require('./MongoDB')

const Insert = async()=>{

    const db = await dbConnect()
    const result = await db.insertMany(
        
           [ {Name:'T1',Brand:'Vivo',Category:'Mobile',Price:15000},   
             {Name:'T2',Brand:'Vivo',Category:'Mobile',Price:25000},
             {Name:'T3',Brand:'Vivo',Category:'Mobile',Price:35000}
        ]
        
    ) 
    console.log(result)
}

Insert()
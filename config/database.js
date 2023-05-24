const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.DATABASE_URL) // REMEMBER AWAIT!!
        const db = mongoose.connection
        console.log(`succesfully connected to ${db.name}`)
        //console.log(db.collections)
    } catch(err){
        console.log("error with connecting to DB:", err)
    }
    
}

connectDB()
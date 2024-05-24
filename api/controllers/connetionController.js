import mongoose from "mongoose"
export const makeConecction = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DB is connected")
    }).catch((error)=>{
        console.log(`Error: ${error}`)
    })
}
import mongoose from "mongoose"

export const connectDb = async () => { console.log(process.env.URI)
    try{
        await mongoose.connect(process.env.URI)
        console.log("Mongodb conectado")
    }
    catch (error){
        console.log(error)
    }
}
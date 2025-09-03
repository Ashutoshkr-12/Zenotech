import mongoose from "mongoose";

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null}
}

export default async function connectDB(){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false
        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/zenotech`,opts).then(mongoose => { return mongoose}).catch(error => console.log(error.message))

    }
    cached.conn = await cached.promise
    return cached.conn

};
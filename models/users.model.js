import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: String, required: true },
}, {minimize: false})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User;
import connectDB from "../../../../config/db"
import User from "../../../../models/users.model"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"



export async function GET(request){

    try {
        
        const { userId } = getAuth(request)

        await connectDB()
        const user = await User.findById(userId)

        if(!user){
            return NextResponse.json({ sucess: false, message: 'User not found'})
        }

        return NextResponse.json({ suncess: true, user})

    } catch (error) {
        return NextResponse.json({ sucess: false, message: error.message})
    }
}
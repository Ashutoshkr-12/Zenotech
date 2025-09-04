import { Product } from "../../../../models/Product.model";
import { uploadtoCloudinary } from "../../../../config/cloudinary";
import connectDB from "../../../../config/db";
import { authSeller } from "../../../../lib/authSeller";
import {   NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";



export async function POST(request){
    try {
        
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({ success: false, message: 'not authorized'})
        }


        const { name, description, category, price, offerPrice } = await request.formData();
        const files = await request.formData('images')

        if(!files){
            return NextResponse.json({ success: false, message: 'Image is required'})

        }

        const result = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                return new Promise((res,rej)=>{
                    {resource_type: 'auto'}
                    (error,result) =>{
                        if(error){
                            rej(error)
                        } else{
                            res(result)
                        }
                    }
                    stream.end(buffer)
                })
            })
        )

        const image = result.map(result => result.secure_url);

        await connectDB()
        const newProduct = await Product.create({
            userId,
            name,description,category,price:Number(price),offerPrice:Number(offerPrice), image, date: Date.now()
        })
   return NextResponse.json({ success: true, message: 'Upload successfully', newProduct })
   
    } catch (error) {
        NextResponse.json({ success: false, message: `No files uploaded server error: ${error.message}`})
    }
}
import { dbConnect } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from 'fs/promises';
const { NextResponse } = require("next/server");
const fs = require('fs');


const loadDB = async () => {
    await dbConnect();
}

loadDB();


//Api endpoint to get all vlogs
export async function GET(requested) {

    const blogId = requested.nextUrl.searchParams.get('id');

    if (blogId) {
        const blog = await BlogModel.findById({ _id: blogId });
        return NextResponse.json({ success: true, blog });
    }
    else {

        const allBlog_Data = await BlogModel.find({});
        
        return NextResponse.json({ success: true, blogs: allBlog_Data });

    }
}

//Api endpoint for Deleting blog by id
export async function DELETE(requested) {

    const blogId = requested.nextUrl.searchParams.get('id');

    const blog = await BlogModel.findById({ _id: blogId });

    fs.unlink(`./public${blog.image}`, () => { });

    await BlogModel.findByIdAndDelete({ _id: blogId });

    return NextResponse.json({ success: true, msg: "Blog Deleted!" });

}

//Api endpoint for uploading blog
export async function POST(requested) {

    //requesting blog data from client side 
    const formData = await requested.formData();


    //providing unique name by adding time
    const timestamp = Date.now();

    //getting image
    const image = formData.get('image');

    // converting image file to byte data
    const imageByteData = await image.arrayBuffer();

    const buffer = Buffer.from(imageByteData);

    //making path to save the image in public folder
    const path = `./public/${timestamp}_${image.name}`;

    //saving image in public folder by the node js async writefile function.
    await writeFile(path, buffer);

    //image url to access the image

    const imgURL = `/${timestamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgURL}`,
        authorImg: `${formData.get('authorImg')}`,
    }

    await BlogModel.create(blogData);


    return NextResponse.json({ success: true, msg: "Blog Added" });

}
import mongoose from "mongoose";


export const dbConnect = async () => {

    await mongoose.connect("mongodb+srv://ayushpanwar2014:NrCG2qNESP5BO1OE@cluster0.pgxon.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0").then(() => {
        console.log("Connected to database");
    });
}
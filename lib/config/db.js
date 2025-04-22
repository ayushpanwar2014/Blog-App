import mongoose from "mongoose";


export const dbConnect = async () => {

    await mongoose.connect("*******").then(() => {
        console.log("Connected to database");
    });
}

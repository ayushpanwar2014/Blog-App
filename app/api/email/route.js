import { dbConnect } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";


const loadDB = async () => {
    await dbConnect();
}

loadDB();

export async function POST(request) {

    const formData = await request.formData();

    const emailData = {
        email: `${formData.get('email')}`,
    }
    try {

        const userFind = await EmailModel.findOne(emailData);

        if(userFind) return NextResponse.json({ success: true, msg: "Email already Subscribed!" });

        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed!" });

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something Went Wrong!" });
    }

}

export async function GET(request) {

    const emails = await EmailModel.find({});

    return NextResponse.json({ success: true, emails: emails });

}
export async function DELETE(request) {


    const emailID = request.nextUrl.searchParams.get('id');

    await EmailModel.findByIdAndDelete({ _id: emailID });

    return NextResponse.json({ success: true, msg: "Email Subscription is Removed!" });


}
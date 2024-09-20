import {User} from "@/models/User";
import mongoose from "mongoose";

export async function GET(){
    mongoose.connect(proccess.env.MONODB_URI);
    const users = await User.find();
    return Response.json(users);
}
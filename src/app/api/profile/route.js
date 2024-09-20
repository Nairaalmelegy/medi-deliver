import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import {UserInfo} from "@/models/UserInfo";

// Helper function to connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    
    const data = await req.json(); // Get the incoming data
    const session = await getServerSession(authOptions);
    
    // Ensure that the session and session.user exist
    if (!session || !session.user || !session.user.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    const email = session.user.email;
    
    // Use $set to update only the provided fields
    await User.updateOne(
      { email }, 
      { 
        $set: {
          name: data.name,
          phone: data.phone,
          streetAddress: data.streetAddress,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country
        }
      }
    );

    return new Response(JSON.stringify(true), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    
    const session = await getServerSession(authOptions);
    
    // Ensure the session and session.user exist
    if (!session || !session.user || !session.user.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    const email = session.user.email;
    
    // Find and return the user's data
    const user = await User.findOne({ email });
    const userInfo = await UserInfo.findOne({email})
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

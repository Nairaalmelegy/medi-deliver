import mongoose from "mongoose";
import { User } from "@/models/User";
import { isAdmin } from "@/app/api/auth/[...nextauth]/route";

// Helper function to connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

export async function GET() {
  try {
    console.log('Connecting to the database...');
    await connectToDatabase();
    console.log('Connected to the database.');

    // Check if the user is an admin
    const adminCheck = await isAdmin();
    console.log('Is admin:', adminCheck);

    if (adminCheck) {
      console.log('Fetching users...');
      const users = await User.find();
      console.log('Users fetched:', users.length);
      return new Response(JSON.stringify(users), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } else {
      console.log('Not an admin');
      return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error('Error in GET /api/users:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

import mongoose from "mongoose";
import { User } from "@/models/User";

// Helper function to connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

async function isAdmin() {
    const session = await getServerSession(authOptions);
    if (!session) {
      return false; // No session, not an admin
    }
  
    // You can check the session user object for admin privileges
    return session?.user?.role === 'admin'; // Adjust according to your schema
  }
  
  export async function GET() {
    try {
      await connectToDatabase(); // Ensure this connects to the correct database
      const users = await User.find(); // Fetch all users from the User collection
      return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  

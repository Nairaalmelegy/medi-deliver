import { User } from "@/models/User"; 
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise), // MongoDB Adapter for database session storage
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // Session duration set to 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGODB_URI);
        
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.role = token.role; // Pass the user role to the session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;  // Store role in JWT token
      }
      return token;
    }
  }
};


const handler = NextAuth(authOptions);

clientPromise
  .then((client) => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

export { handler as GET, handler as POST };

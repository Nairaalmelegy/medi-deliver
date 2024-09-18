import { User } from "@/models/User";
import mongoose from "mongoose";
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from  "bcryptjs";
import { MongoDBAdapter } from  "@auth/mongodb-adapter";

import clientPromise from  "@/libs/mongoConnect";



const handler = NextAuth({
    secret:  process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({email});
        const passwordOk =  user && bcrypt.compareSync(password, user.password);

        
        if (passwordOk){
            return user;
        }
        return null
      }
    })
  ],
});


export { handler as GET, handler as POST }
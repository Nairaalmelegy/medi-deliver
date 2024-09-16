import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/app/models/User";

const handler = NextAuth({
  secret: process.env.SECRET,
    providers:[
        CredentialsProvider({
            name: 'credentials',
            id: 'credentials',
            
            credentials: {
              email: { label: "Email", type: "email", placeholder: "example@someprovider.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const email = credentials?.email;
              const password = credentials?.password;
              mongoose.connect(process.env.MONGO_URL);
              const user = await User.findOne({email});
              const passwordOk =  user && bcrypt.compareSync(password, user.password);

              
              if(passwordOk){
                return user;
              }
              // Return null if user data could not be retrieved
              return null
            }
          })
    ],
});

export { handler as GET, handler as POST }
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import * as mongoose from "mongoose";
import User from '@/app/models/User';
import bcrypt from "bcrypt";


const handler = NextAuth({
  secret: process.env.SECRET,
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            
            credentials: {
              username: { label: "Username", type: "text", placeholder: "Enter your name" },
              email: { label: "Email", type: "email", placeholder: "example@someprovider.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const email = credentials?.email;
              const password = credentials?.password;
              mongoose.connect(process.env.MONGO_URL);
              const user = User.findOne({email});
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
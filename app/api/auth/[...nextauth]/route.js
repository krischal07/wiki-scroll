import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:",credentials)
        const [rows] = await db.query("Select * from users where email =?", [
          credentials.email,
        ]);
        const user = rows[0];
        console.log("User from DB:",user)
        if(!user){
            console.log("No user found for email:", credentials.email)
            return null;
        }
        const isValid = await bcrypt.compare(credentials.password,user.password)
        console.log("Password is valid", isValid)
        if(!isValid){
            return null;
        }
        return {id: user.id, email:user.email}
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages:{
    signIn:'/login'
  },
 
  callbacks:{
    async session({session, token}){
        session.user.id = token.sub;
        return session;
    }
  }
};

export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions)

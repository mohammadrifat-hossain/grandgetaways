// import NextAuth,{ AuthOptions } from 'next-auth'
// import { PrismaAdapter} from '@next-auth/prisma-adapter'
// import GithubProvider from 'next-auth/providers/github'
// import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'

// import prisma from '@/libs/prismadb'
// import bcrypt from 'bcrypt'

// export const authOptions : AuthOptions = {
//     adapter : PrismaAdapter(prisma),
//     providers:[
//         GithubProvider({
//             clientId: process.env.GITHUB_ID as string,
//             clientSecret: process.env.GITHUB_SECRET as string,
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'email', type: 'text'},
//                 password: { label: 'password', type: 'password'},
//             },
//             async authorize(credentials){
//                 if(!credentials?.email || !credentials?.password){
//                     throw new Error('Invalid Credentials')
//                 }

//                 const user = await prisma.user.findUnique({
//                     where:{
//                         email: credentials.email
//                     }
//                 })

//                 if(!user || !user?.hashedPassword){
//                     throw new Error('Invalid Credentials')
//                 }

//                 const isCorrectPassword = await bcrypt.compare(
//                     credentials.password,
//                     user.hashedPassword
//                 )

//                 if(!isCorrectPassword){
//                     console.log(isCorrectPassword);

//                     throw new Error("Invalid password")
//                 }

//                 return user
//             }
//         })
//     ],

//     pages: {
//         signIn: '/',
//     },
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         strategy: 'jwt'
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// }

// export default NextAuth(authOptions)

import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Corrected property name to 'adapter'
    providers: [
        GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid Credentials");
            }

            const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            });

            if (!user || !user?.hashedPassword) {
            throw new Error("Invalid Credentials");
            }

            const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
            );

            if (!isCorrectPassword) {
            console.log(isCorrectPassword);
            throw new Error("Invalid password");
            }

            return user;
        },
        }),
    ],
    pages: {
        signIn: "/", // Specify the path to your sign-in page as a string
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }: any) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
            token.accessToken = account.access_token;
        }
        return token;
        },
        async session({ session, token, user }: any) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken;
        return session;
        },
    },
};

export default NextAuth(authOptions);

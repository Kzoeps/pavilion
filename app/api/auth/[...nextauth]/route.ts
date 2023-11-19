import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, {type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ]
}


const handler = NextAuth(authOptions);

// can control the request to auth
// async function auth(req: NextApiRequest, res: NextApiResponse) {
//     console.log(req);
//     console.log(res);
//     return await NextAuth(req, res, authOptions);
// }

export { handler as GET, handler as POST }
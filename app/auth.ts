import NextAuth, { type Profile, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { sql } from "@vercel/postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // TODO: Revert back to true when we have a valid SSL certificate
  ssl: {
    rejectUnauthorized: false,
  },
});

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ profile }) => {
      const { email } = profile as Profile;
      const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (rows.length === 0) {
        return false
      }
      return true
    },
  },
  adapter: PostgresAdapter(pool) as NextAuthOptions["adapter"],
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth(authOptions);

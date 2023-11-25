import { PavilionUser, UserSession } from "@/lib/types";
import { DbProfile, checkChangesInProfile } from "@/lib/utils";
import PostgresAdapter from "@auth/pg-adapter";
import { sql } from "@vercel/postgres";
import NextAuth, {
  type NextAuthConfig,
  type Profile
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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

const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ profile }) => {
      // See utils.ts [checkChangesInProfile] for more details
      const { email } = profile as Profile;
      const { rows } =
        await sql<DbProfile>`SELECT * FROM users WHERE email = ${email}`;
      if (rows.length === 0) {
        return false;
      }
      const profileChanges = checkChangesInProfile(rows[0], profile);
      if (profileChanges) {
        const { name, image, emailVerified } = profileChanges;
        // await sql`UPDATE users SET name = ${name}, emailVerified = ${emailVerified || null}, image = ${image} WHERE email = ${email}`
        await sql`UPDATE users SET name = ${name}, image = ${image} WHERE email = ${email}`;
      }
      return true;
    },
    session: async ({ session, user }) => {
      (session as UserSession).user.role = (
        user as unknown as PavilionUser
      ).role;
      (session as UserSession).user.id = (user as unknown as PavilionUser).id;
      return session as UserSession;
    },
  },
  adapter: PostgresAdapter(pool) as NextAuthConfig["adapter"],
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);

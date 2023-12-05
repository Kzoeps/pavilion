import { ADMIN_PATHS, AUTH_PATHS, PRIVILEGED_USERS } from "@/lib/constants";
import { PavilionUser, Roles, UserSession } from "@/lib/types";
import { DbProfile, checkChangesInProfile } from "@/lib/utils";
import PostgresAdapter from "@auth/pg-adapter";
import { createPool, sql } from "@vercel/postgres";
import NextAuth, { type NextAuthConfig, type Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

const pool = createPool();

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
    authorized: async ({ request, auth }) => {
      if (
        ADMIN_PATHS.find((path) => request.nextUrl.pathname.startsWith(path))
      ) {
        return !!PRIVILEGED_USERS.includes(
          (auth?.user as PavilionUser)?.role as Roles
        );
      }
      if (
        AUTH_PATHS.find((path) => request.nextUrl.pathname.startsWith(path))
      ) {
        if (auth?.user) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
      return true;
    },
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
      ).role as Roles;
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

import { DefaultSession, User } from "next-auth";

export interface BasicUser {
  id: number;
  name: string;
}
export type UserSession = {
  user: { role: string; id: string };
} & DefaultSession;
export interface PavilionUser extends User {
  id: string;
  role: string;
}

export type { UserSession as PavilionSession }

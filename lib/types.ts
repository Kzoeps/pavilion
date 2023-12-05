import { DefaultSession, User } from "next-auth";

export enum Roles {
  ADMIN = "admin",
  FACULTY = "faculty",
  STUDENT = "student",
}

export interface BasicUser {
  id: number;
  name: string;
}
export type UserSession = {
  user: { role: Roles; id: string };
} & DefaultSession;
export interface PavilionUser extends User {
  id: string;
  role: string;
}

export interface Talks {
  id: number;
  title: string;
  description: string;
  datetime: Date;
  location: string;
  creator_id: number;
}


export interface Note {
  id: string;
  student_id: number; 
  talk_id: number;
  content: JSON;
  created_at: Date
}

export type { UserSession as PavilionSession };

export enum TimeZone {
  local = "America/New_York",
}

export const TimeFormat = 'YYYY-MM-DDTHH:mm'

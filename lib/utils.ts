import { type ClassValue, clsx } from "clsx"
import { Profile } from "next-auth"
import { twMerge } from "tailwind-merge"
import { isDeepStrictEqual } from "util"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string | undefined | null) {
  if (!name) {
    return ""
  }
  const names = name.split(" ")
  const initials = names[0][0] + names[names.length - 1][0]
  return initials.toUpperCase()
}

interface DbProfile {
  name: string;
  email: string;
  class_year: string;
  advisor_id: number;
  id: number;
  emailVerified: boolean;
}

export function checkChangesInProfile(dbProfile: DbProfile, oauthProfile: Profile) {

}
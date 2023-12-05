import { clsx, type ClassValue } from "clsx"
import { isEqual, mapKeys, pick } from "lodash-es"
import { Profile } from "next-auth"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
 
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

export interface DbProfile {
  name: string;
  email: string;
  class_year: string;
  advisor_id: number;
  id: number;
  emailVerified: boolean;
}

/**
 * Essentially when an admin creates a user it creates a user in the user table. This is required to check if the user is allowed to 
 * use the app (as seen in the callback for sign in in app/auth.ts). However when the admin creates the user, since we now have a user in the database
 * when the user logs in next time with their email since the details for the user are already present in the user table it skips updating it. Since we have enabled
 * allowDangerousEmailAccountLinking in the google provider, accounts are automatically linked however their details are not updated.
 * So in the signIn callback we need to check if their details are already updated and if not update them. And this function checks to see if the details are updated. 
 * @param dbProfile the profile from the database
 * @param oauthProfile  the profile provided by google
 * @returns boolean | the values that need to be updated
 */
export function checkChangesInProfile(dbProfile: DbProfile, oauthProfile: Profile | undefined) {
  if (!oauthProfile) {
    return false
  }
  const dbProfileKeys = {
    picture: 'image',
    email_verified: 'emailVerified',
    name: 'name'
  }
  const dbProfileVals = pick(dbProfile, ["name", "image", "emailVerified"]) 
  const oauthProfileVals = mapKeys(pick(oauthProfile, ["name",  "picture", "email_verified"]), (val, key: keyof typeof dbProfileKeys) => (dbProfileKeys[key] || key)) 
  if (!isEqual(dbProfileVals, oauthProfileVals)) {
    return oauthProfileVals
  }
  return false
}

export const localizeTime = (datetime: Date) => {
  const localized = dayjs(datetime).tz("America/New_York")
  return localized
}

export const displayTime = (datetime: Date, format?: string) => {
  const localized = localizeTime(datetime)
  return localized.format(format || "MMMM D, YYYY, h:mm A")
}
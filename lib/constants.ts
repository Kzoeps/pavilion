import { Roles } from "./types"

export const ADMIN_PATHS = ['/dashboard']
export const AUTH_PATHS = ['/login', '/api/auth/signin']
export const PRIVILEGED_USERS = [Roles.ADMIN, Roles.FACULTY]
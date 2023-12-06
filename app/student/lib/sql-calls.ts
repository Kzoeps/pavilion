import { sql } from "@vercel/postgres";

export const getNotesCount = (id: string) => sql`SELECT COUNT(id), SUM(approved) AS approved_count FROM notes WHERE student_id = ${id}`

import { sql } from "@vercel/postgres";

export const getNotesCount = (id: string) => sql`SELECT COUNT(id), SUM(CASE WHEN approved = true THEN 1 ELSE 0 END) AS approved_count FROM notes WHERE student_id = ${id}`

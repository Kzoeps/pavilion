import { ProgressProfile, columns, dummyData } from "./columns";
import { sql } from "@vercel/postgres";
import { DataTable } from "./data-table";
import { auth } from "../auth";

export default async function StudentsDisplay() {
    const session = await auth();
    // console.log(session?.user?.role)
    const { rows } = await sql`SELECT id, name, email, class_year, advisor_id FROM users WHERE role = 'student'`
    return (
        <>
            <DataTable columns={columns} data={rows as ProgressProfile[]} />
        </>
    )
}
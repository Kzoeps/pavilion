import { getCurrentClassYears } from "@/lib/class-years";
import { BasicUser, PavilionSession, Roles } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { auth } from "../auth";
import { ProgressProfile, columns } from "./columns";
import { DataTable } from "./data-table";
import { FilterParams } from "./utils/types";

const getClassYear = (classYear?: string) => {
    if (!classYear) return getCurrentClassYears()[0];
    else if (classYear === 'all') return false;
    return classYear;
}

//  const BASE_SQL = `SELECT U.id, U.name, U.email, U.class_year, U.advisor_id, COUNT(N.id) as NOTES_COUNT FROM users U LEFT JOIN notes N ON U.id = N.student_id WHERE U.role = 'student' GROUP BY U.id`

export default async function StudentsDisplay({ filterParams }: { filterParams: FilterParams }) {
    const { rows: advisors } = await sql<BasicUser>`SELECT id, name FROM users WHERE role = 'faculty'`
    const session = await auth() as PavilionSession;
    const defaultAdvisorId = (session?.user?.role === 'faculty') ? session?.user?.id : undefined;
    const { advisor_id = defaultAdvisorId, class_year } = filterParams;
    const queryClassYear = getClassYear(class_year);
    let response;
    if ([undefined, 'all', null].includes(advisor_id) && queryClassYear === false) {
        console.log('all query')
        response = await sql<ProgressProfile>`SELECT U.id, U.name, U.email, U.class_year, U.advisor_id, COUNT(N.id) as NOTES_COUNT FROM users U LEFT JOIN notes N ON U.id = N.student_id WHERE U.role = 'student' GROUP BY U.id`
    } else if ([undefined, 'all', null].includes(advisor_id)) {
        // response = await sql<ProgressProfile>`SELECT id, name, email, class_year, advisor_id FROM users WHERE role = 'student' AND class_year = ${queryClassYear}`
        response = await sql<ProgressProfile>`SELECT U.id, U.name, U.email, U.class_year, U.advisor_id, COUNT(N.id) as NOTES_COUNT FROM users U LEFT JOIN notes N ON U.id = N.student_id WHERE U.role = 'student' AND U.class_year=${queryClassYear} GROUP BY U.id`
        // response = await sql<ProgressProfile>`SELECT U.id, U.name, U.email, U.class_year, U.advisor_id, COUNT(N.id) as NOTES_COUNT FROM users U LEFT JOIN notes N ON U.id = N.student_id WHERE U.role = 'student' AND U.class_year=${queryClassYear} GROUP BY U.id `
    } else if (queryClassYear === false) {
        response = await sql<ProgressProfile>`SELECT U.id, U.name, U.email, U.class_year, U.advisor_id, COUNT(N.id) as NOTES_COUNT FROM users U LEFT JOIN notes N ON U.id = N.student_id WHERE U.role = 'student' AND U.advisor_id = ${advisor_id} GROUP BY U.id`
    } else {
        // response = await sql<ProgressProfile>`SELECT U.id, U.name, U.email, U.class_year, U.advisor_id, COUNT(N.id) as NOTES_COUNT FROM users U LEFT JOIN notes N ON U.id = N.student_id WHERE U.role = 'student' AND U.advisor_id = ${advisor_id} U.class_year=${queryClassYear} GROUP BY U.id AND `
        response = await sql<ProgressProfile>`SELECT U.id, U.name, U.email, U.class_year, U.advisor_id, COUNT(N.id) as NOTES_COUNT FROM users U LEFT JOIN notes N ON U.id = N.student_id WHERE U.role = 'student' AND U.class_year=${queryClassYear} AND U.advisor_id = ${advisor_id} GROUP BY U.id`
        // response = await sql<ProgressProfile>`SELECT id, name, email, class_year, advisor_id FROM users WHERE role = 'student' AND advisor_id = ${advisor_id} AND class_year = ${queryClassYear}`
    }
    let { rows } = response;
    rows = rows.map(row => {
        return {
            ...row,
            advisor: advisors.find(({ id }) => id === row.advisor_id)?.name
        }
    })
    return (
        <>
            <DataTable columns={columns} data={rows as ProgressProfile[]} />
        </>
    )
}
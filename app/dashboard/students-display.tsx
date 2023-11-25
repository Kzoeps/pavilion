import { ProgressProfile, columns, dummyData } from "./columns";
import { sql } from "@vercel/postgres";
import { DataTable } from "./data-table";
import { auth } from "../auth";
import { FilterParams } from "./utils/types";
import { PavilionSession } from "@/lib/types";
import { getCurrentClassYears } from "@/lib/class-years";

const getClassYear = (classYear?: string) => {
    if (!classYear) return getCurrentClassYears()[0];
    else if (classYear === 'all') return false;
    return classYear;
}

export default async function StudentsDisplay({ filterParams }: { filterParams: FilterParams }) {
    const session = await auth() as PavilionSession;
    const defaultAdvisorId = (session?.user?.role === 'faculty') ? session?.user?.id : undefined;
    const { advisor_id = defaultAdvisorId, class_year } = filterParams;
    const queryClassYear = getClassYear(class_year);
    let response;
    if ([undefined, 'all', null].includes(advisor_id) && queryClassYear === false) {
        response = await sql<ProgressProfile>`SELECT id, name, email, class_year, advisor_id FROM users WHERE role = 'student'`
    } else if ([undefined, 'all', null].includes(advisor_id)) {
        response = await sql<ProgressProfile>`SELECT id, name, email, class_year, advisor_id FROM users WHERE role = 'student' AND class_year = ${queryClassYear}`
    } else {
        response = await sql<ProgressProfile>`SELECT id, name, email, class_year, advisor_id FROM users WHERE role = 'student' AND advisor_id = ${advisor_id} AND class_year = ${queryClassYear}`
    }
    const { rows } = response;
    return (
        <>
            <DataTable columns={columns} data={rows as ProgressProfile[]} />
        </>
    )
}
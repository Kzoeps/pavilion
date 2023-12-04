import { sql } from "@vercel/postgres";
import StudentNotesInfo from "../components/student-notes-info";
import StudentProgress from "../components/student-progress";

export default async function StudentPage({ params }: { params: { studentId: string } }) {
    const { studentId } = params
    let studentInfo = {
        name: '',
        email: '',
        class_year: ''
    }
    if (studentId) {
        const { rows } = await sql`SELECT name, class_year, email FROM users WHERE id = ${studentId}`
        if ( rows.length) {
            studentInfo = rows[0] as typeof studentInfo
        }
    }
    return (
        <>
            <h3 className="text-2xl font-medium">{studentInfo.name} (Class of {studentInfo.class_year})</h3>
            <p className=" italic">{studentInfo.email}</p>
            <StudentNotesInfo id={studentId} />
            <StudentProgress id={studentId}/>
        </>
    )
}
import StudentNotesInfo from "../components/student-notes-info";

export default function StudentPage({params}: {params: {studentId: string}}) {
    const {studentId} = params
    return (
        <>
            <StudentNotesInfo id={studentId} />
        </>
    )
}
import { sql } from "@vercel/postgres";
import { columns } from "../lib/columns";
import { DataTable } from "./progress-table";
import { displayTime, localizeTime } from "@/lib/utils";


const dummyData = [
    {
        talk: 'Quantum Mechanics with Dr. Smith',
        date: 'November 15th 2023',
        approved: false
    }
]

interface ProgressTableProps {
    id: string
}

export default async function ProgressTable({id}: ProgressTableProps) {
    const { rows } = await sql`SELECT N.id, T.title, T.datetime FROM notes N LEFT JOIN talks T ON N.talk_id = T.id WHERE student_id = ${id}`
    let data = rows.map(row => {
        return {
            ...row,
            approved: true,
            datetime: displayTime(row.datetime, "MMMM D, YYYY") 
        }
    })
    return (
        <>
            <section className="mt-4">
                <DataTable columns={columns} data={data}/>
            </section>
        </>
    )
}
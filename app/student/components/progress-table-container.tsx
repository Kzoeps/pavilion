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

interface ProgressTableData {
    id: string;
    talk_id: number;
    title: string;
    datetime: string;
    approved: boolean;
}

interface ProgressTableProps {
    id: string
}

export default async function ProgressTable({id}: ProgressTableProps) {
    const { rows } = await sql`SELECT N.id, N.approved, T.title, T.datetime, N.talk_id FROM notes N LEFT JOIN talks T ON N.talk_id = T.id WHERE student_id = ${id}`
    let data = rows.map(row => {
        return {
            ...row,
            datetime: displayTime(row.datetime, "MMMM D, YYYY") 
        }
    }) as ProgressTableData[]
    return (
        <>
            <section className="mt-4">
                <DataTable columns={columns} data={data}/>
            </section>
        </>
    )
}
import { columns } from "../lib/columns";
import { DataTable } from "./progress-table";

const dummyData = [
    {
        talk: 'Quantum Mechanics with Dr. Smith',
        date: 'November 15th 2023',
        approved: false
    }
]

export default async function ProgressTable() {
    return (
        <>
            <section className="mt-4">
                <DataTable columns={columns} data={dummyData}/>
            </section>
        </>
    )
}
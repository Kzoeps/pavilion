import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Dashboard() {
    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-row justify-end gap-3">
                <Button>
                    Add Student
                </Button>
                <Button>
                    Filter
                </Button>
            </section>
            <DataTable columns={columns} data={[]} />
        </main>
    )
}
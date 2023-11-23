import { Button } from "@/components/ui/button";
import { columns, dummyData } from "./columns";
import { DataTable } from "./data-table";
import Progress from "@/components/progress";

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
            <DataTable columns={columns} data={dummyData} />
            <Progress amountDone={10} classYear={"2024"}/>
        </main>
    )
}
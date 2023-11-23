import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { columns, dummyData } from "./columns";
import { DataTable } from "./data-table";
import AddStudentForm from "./student-addition-form";
import AddStudentDialog from "./add-student-dialog";

export default function Dashboard() {
    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-row justify-end gap-3">
                <AddStudentDialog />
                <Button>
                    Filter
                </Button>
            </section>
            <DataTable columns={columns} data={dummyData} />
        </main>
    )
}
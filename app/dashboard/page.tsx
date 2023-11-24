import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import AddAdvisorDialog from "./add-advisor-dialog";
import AddStudentDialog from "./add-student-dialog";
import { columns, dummyData } from "./columns";
import { DataTable } from "./data-table";
import { Suspense } from "react";

export default function Dashboard({ searchParams }: { searchParams: Record<string, string> }) {
    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-row justify-end gap-3">
                <Suspense fallback={<p>Loading</p>}>
                    <AddStudentDialog />
                </Suspense>
                <Suspense fallback={<p>Loading</p>}>
                    <AddAdvisorDialog />
                </Suspense>
                <Button>
                    Filter
                </Button>
            </section>
            <Suspense fallback={<p>Loading</p>}>
                <DataTable columns={columns} data={dummyData} />
            </Suspense>
            <Toaster />
        </main>
    )
}
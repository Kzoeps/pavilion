import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import AddAdvisorDialog from "./add-advisor-dialog";
import AddStudentDialog from "./add-student-dialog";
import UsersFilterDialog from "./filter-dialog";
import StudentsDisplay from "./students-display";

// TODO: Need pagination
export default function Dashboard({ searchParams }: { searchParams: Record<string, string> }) {
    const filterParams = {
        advisor_id: searchParams?.advisor_id,
        class_year: searchParams?.class_year
    }
    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-row justify-end gap-3">
                <Suspense fallback={<p>Loading</p>}>
                    <AddStudentDialog />
                </Suspense>
                <Suspense fallback={<p>Loading</p>}>
                    <AddAdvisorDialog />
                </Suspense>
                <Suspense>
                    <UsersFilterDialog filterParams={filterParams} />
                </Suspense>
            </section>
            <Suspense fallback={<p>Loading</p>}>
                <StudentsDisplay filterParams={filterParams} />
            </Suspense>
            <Toaster />
        </main>
    )
}
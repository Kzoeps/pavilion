import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { columns, dummyData } from "./columns";
import { DataTable } from "./data-table";
import AddStudentForm from "./student-addition-form";

export default function Dashboard() {
    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-row justify-end gap-3">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <AddStudentForm />
                    </DialogContent>
                </Dialog>
                <Button>
                    Filter
                </Button>
            </section>
            <DataTable columns={columns} data={dummyData} />
        </main>
    )
}
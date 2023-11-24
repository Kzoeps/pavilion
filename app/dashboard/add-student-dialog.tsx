import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddStudentForm from "./student-addition-form";
import { sql } from "@vercel/postgres";

export default async function AddStudentDialog() {
    const { rows } = await sql`SELECT id, name FROM users WHERE role = 'faculty'`
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Student</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Student</DialogTitle>
                    <DialogDescription>
                        Once a student is added, they will get an invitation email.
                    </DialogDescription>
                </DialogHeader>
                <AddStudentForm faculty={rows.map(({ id, name }) => {
                    return ({ id, name })
                })} />
            </DialogContent>
        </Dialog>
    )
}
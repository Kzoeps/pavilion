import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { sql } from "@vercel/postgres";
import AddStudentForm from "./student-addition-form";

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
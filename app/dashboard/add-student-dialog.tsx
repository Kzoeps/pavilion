import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddStudentForm from "./student-addition-form";

export default function AddStudentDialog() {
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
                <AddStudentForm />
            </DialogContent>
        </Dialog>
    )
}
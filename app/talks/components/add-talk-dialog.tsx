import AddStudentForm from "@/app/dashboard/student-addition-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddTalkForm from "./add-talk-form";

export default function AddTalkDialog() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create Talk</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Talk</DialogTitle>
                        <DialogDescription>
                            Once you create a talk, everyone will be able to see it.
                        </DialogDescription>
                    </DialogHeader>
                    <AddTalkForm/>
                </DialogContent>
            </Dialog>
        </>
    )
}
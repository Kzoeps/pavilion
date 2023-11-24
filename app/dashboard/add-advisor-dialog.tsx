import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddAdvisorForm from "./advisor-addition-form";

export default function AddAdvisorDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Advisor</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Advisor</DialogTitle>
                    <DialogDescription>
                        Once an advisor is added, they will get an invitation email.
                    </DialogDescription>
                </DialogHeader>
                <AddAdvisorForm/>
            </DialogContent>
        </Dialog>
    )
}
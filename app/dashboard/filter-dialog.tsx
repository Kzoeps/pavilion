import { Button } from "@/components/ui/button";
import {  Dialog, DialogDescription, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function UsersFilterDialog({ filterParams }: { filterParams: { advisor_id?: string, class_year?: string }}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Filter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter</DialogTitle>
                    <DialogDescription>
                        Filter based on your preferences.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
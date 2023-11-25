import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import FilterForm from "./filter-form";
import { sql } from "@vercel/postgres";
import SubmitButton from "@/components/submit-button";

export default async function UsersFilterDialog({ filterParams }: { filterParams: { advisor_id?: string, class_year?: string } }) {
    const { rows } = await sql<{ id: string, name: string }>`SELECT id, name FROM users WHERE role = 'faculty'`
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
                <FilterForm currentAdvisor={undefined} currentClassYear={undefined} faculty={rows} />

            </DialogContent>
        </Dialog>
    )
}
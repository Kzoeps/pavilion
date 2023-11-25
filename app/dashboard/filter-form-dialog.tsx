import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentClassYears } from "@/lib/class-years";
import { filterStudents } from "./actions/filter";

// NOT USED: filter doesnt close on redirect and to close it programmatically we need to manually control opening & closing of modal using params
// which is too much fo a hassle so just using normal filters.

export default function FilterForm({ faculty, currentClassYear, currentAdvisor }: { currentClassYear?: string; currentAdvisor?: string; faculty: { id: string, name: string }[] }) {
    return (
        <form action={filterStudents}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Class Year
                    </Label>
                    <Select defaultValue={currentClassYear || getCurrentClassYears()[0]} required name="classYear">
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Class Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Class Year</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                {getCurrentClassYears().map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Advisor
                    </Label>
                    <Select defaultValue={currentAdvisor || "all"} required name="advisor">
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Advisor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Advisor</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                {faculty.map(({ id, name }) => <SelectItem key={id} value={id.toString()}>{name}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <DialogTrigger>
                    <Button variant="secondary" >Cancel</Button>
                </DialogTrigger>
                <SubmitButton pendingLabel="Filtering" label="Filter" />
            </DialogFooter>
        </form>
    )
}
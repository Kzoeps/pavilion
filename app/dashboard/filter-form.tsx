import { getCurrentClassYears } from "@/lib/class-years";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function FilterForm({ faculty, currentClassYear, currentAdvisor }: { currentClassYear: string; currentAdvisor: string; faculty: { id: string, name: string }[] }) {
    return (
        <form>
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
        </form>
    )
}
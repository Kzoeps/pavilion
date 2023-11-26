'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentClassYears } from "@/lib/class-years";

export default function TalksFilter() {
    return (
        <>
            <form className="w-full flex justify-end">
                <Select defaultValue={getCurrentClassYears()[0]} required name="talkYear">
                    <SelectTrigger className="w-1/6">
                        <SelectValue placeholder="Select Talk Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Talk Year</SelectLabel>
                            {getCurrentClassYears().map(year => <SelectItem onSelect={(option) => console.log(option)} key={year} value={year}>{year}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </form>
        </>
    )
}
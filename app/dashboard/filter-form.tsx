'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentClassYears } from "@/lib/class-years";
import { BasicUser } from "@/lib/types";
import { useRef } from "react";
import { filterStudents } from "./actions/filter";

interface ClassYearFilterProps {
    faculty: BasicUser[];
    currentAdvisor?: string;
    currentClassYear?: string
}

export default function FilterForm({ currentClassYear, currentAdvisor, faculty }: ClassYearFilterProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const handleSubmit = () => {
        formRef.current?.requestSubmit()
    }
    return (
        <form ref={formRef} onChange={handleSubmit} action={filterStudents} className="flex gap-4">
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
        </form>
    )
}
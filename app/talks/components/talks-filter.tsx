'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterTalk } from "../actions/add-talk";
import { useRef } from "react";

export default function TalksFilter({year}: {year?: string}) {
    const formRef = useRef<HTMLFormElement>(null)
    const talkYear = year || new Date().getFullYear().toString()

    const handleSubmit = () => {
        formRef.current?.requestSubmit()
    }
    return (
        <>
            <form ref={formRef} action={filterTalk} onChange={handleSubmit} className="justify-start">
                <Select defaultValue={talkYear} required name="talkYear">
                    <SelectTrigger className=" w-28">
                        <SelectValue placeholder="Select Talk Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Talk Year</SelectLabel>
                            {[2023, 2022, 2021].map(year => <SelectItem onSelect={(option) => console.log(option)} key={year} value={year.toString()}>{year}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </form>
        </>
    )
}
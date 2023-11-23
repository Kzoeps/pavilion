'use client'
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormState } from "react-dom";
import { addStudent } from "./actions";
import SubmitButton from "./submit-button";
import { useEffect } from "react";


export default function AddStudentForm() {
    const [state, formAction] = useFormState(addStudent, {
        name: '',
        email: '',
        classYear: '',
        advisor: ''
    });
    return (
        <form action={formAction}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Name
                    </Label>
                    <Input required id="name" name="name" className="col-span-3" />
                    {!!state?.name && <div className="col-span-1"></div>}
                    {!!state?.name && <p className="col-span-3 text-xs text-red-500">
                        {state.name}
                    </p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Email
                    </Label>

                    <Input required type="email" name="email" id="email" className="col-span-3" />
                    {!!state?.email && <div className="col-span-1"></div>}
                    {!!state?.email && <p className="col-span-3 text-xs text-red-500">
                        {state.email}
                    </p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Class Year
                    </Label>
                    <Select required name="classYear">
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Class Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Class Year</SelectLabel>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="col-span-1"></div>
                    {!!state?.classYear && <p className="text-xs col-span-3  text-red-500">
                        {state.classYear}
                    </p>}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Advisor
                    </Label>
                    <Select required name="advisor">
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Advisor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Advisor</SelectLabel>
                                <SelectItem value="1232192">James Lee</SelectItem>
                                <SelectItem value="1239213">Tarimo</SelectItem>
                                <SelectItem value="12309922">Karimo</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="col-span-1"></div>
                    {!!state?.advisor && <p className="text-xs col-span-3  text-red-500">
                        {state.advisor}
                    </p>}
                </div>
            </div>
            <DialogFooter>
                <SubmitButton />
            </DialogFooter>
        </form>
    )
}

'use client'
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubmitButton from "./submit-button";
import { useFormState } from "react-dom";
import { addAdvisor } from "./actions";

export default function AddAdvisorForm() {
    const [state, formAction] = useFormState(addAdvisor, {
        name: '',
        email: '',
        role: ''
    })
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
                        Role
                    </Label>
                    <Select required name="role">
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Role</SelectLabel>
                                <SelectItem value="faculty">Faculty</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="col-span-1"></div>
                    {!!state?.role && <p className="text-xs col-span-3  text-red-500">
                        {state.role}
                    </p>}
                </div>
            </div>
            <DialogFooter>
                <SubmitButton label="Add Advisor" pendingLabel="Adding Advisor" />
            </DialogFooter>
        </form>
    )
}
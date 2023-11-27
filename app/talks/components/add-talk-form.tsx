'use client'
import SubmitButton from "@/components/submit-button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimeFormat } from "@/lib/types";
import dayjs from "dayjs";
import { addTalk } from "../actions/add-talk";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";


export default function AddTalkForm() {
    const { toast } = useToast()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [state, formAction] = useFormState(addTalk, { success: false, message: '' })
    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Talk Created',
                description: 'Talk has been created successfully',
            })
            buttonRef.current?.click();
        } else if (!state.success && state.message) {
            toast({
                variant: 'destructive',
                title: 'Talk Creation Failed',
                description: state.message,
            })
        }
    }, [state, toast])
    return (
        <>
            <form action={formAction} className="grid py-4 gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Title
                    </Label>
                    <Input required id="title" name="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Location
                    </Label>
                    <Input required id="location" name="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Date & Time
                    </Label>
                    <Input min={dayjs().format(TimeFormat)} type="datetime-local" required id="datetime" name="datetime" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Description
                    </Label>
                    <Textarea required id="description" name="description" className="col-span-3" rows={6} />
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button ref={buttonRef} variant="outline">Cancel</Button>
                    </DialogClose>
                    <SubmitButton label="Create Talk" pendingLabel="Creating Talk" />
                </DialogFooter>
            </form>
        </>
    )
}
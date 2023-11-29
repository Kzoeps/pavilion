'use client'
import SubmitButton from "@/components/submit-button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Talks, TimeFormat } from "@/lib/types";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { addTalk, updateTalk, deleteTalk } from "../actions/add-talk";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

dayjs.extend(utc)
dayjs.extend(timezone)

interface AddTalkFormProps extends Partial<Talks>{
    type?: 'create' | 'edit';
}

const config = {
    create: {
        submit: 'Create Talk',
        submitPending: 'Creating Talk',
    },
    edit: {
        submit: 'Update',
        submitPending: 'Updating Talk',
    }
}


export default function AddTalkForm(props: AddTalkFormProps) {
    const { title, description, id, datetime, location, type = 'create' } = props;
    const { toast } = useToast()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [state, formAction] = useFormState(type === 'create' ? addTalk : updateTalk, { success: false, message: '' })
    const getDateTime = (datetime: Date | null) => {
        if (!datetime) return '';
        return dayjs(datetime).tz("America/New_York").format(TimeFormat)
    }

    useEffect(() => {
        if (state.success) {
            toast({
                description: state.message,
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
                <Input type="hidden" name="id" id="id" value={id}/>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Title
                    </Label>
                    <Input defaultValue={title || ''} required id="title" name="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Location
                    </Label>
                    <Input defaultValue={location || ''} required id="location" name="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Date & Time
                    </Label>
                    <Input defaultValue={getDateTime(datetime || new Date())} min={datetime ? getDateTime(datetime) : dayjs().format(TimeFormat)} type="datetime-local" required id="datetime" name="datetime" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Description
                    </Label>
                    <Textarea defaultValue={description || ''} required id="description" name="description" className="col-span-3" rows={6} />
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button type="reset" ref={buttonRef} variant="outline">Cancel</Button>
                    </DialogClose>
                    <SubmitButton label={config[type].submit}pendingLabel={config[type].submitPending}/>
                </DialogFooter>
            </form>
        </>
    )
}
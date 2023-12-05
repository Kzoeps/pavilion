'use client'
import { approveTalk } from "@/app/talks/actions/add-talk";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { type SwitchProps } from "@radix-ui/react-switch";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface SwitchSubmitProps extends SwitchProps {
}
const SwitchSubmit = (props: SwitchSubmitProps) => {
    const { pending } = useFormStatus();
    return (
        <Switch disabled={pending} name="approved" id="approved" className="data-[state=checked]:bg-green-500" {...props} />
    )
}

interface ApprovalSwitchProps {
    noteId: string;
    approved?: boolean
}

export default function ApprovalSwitch({noteId, approved = false}: ApprovalSwitchProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const handleSubmit = () => {
        formRef.current?.requestSubmit()
    }
    return (
        <form ref={formRef} action={approveTalk}>
            <Input hidden name="noteId" value={noteId}/>
            <div className="flex gap-3 items-center border border-solid rounded-full p-4">
                <SwitchSubmit name="approved" checked={approved} onCheckedChange={handleSubmit} />
                <h4 className="text-xl">Approved</h4>
            </div>
        </form>
    )
}
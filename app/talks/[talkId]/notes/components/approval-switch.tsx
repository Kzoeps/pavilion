'use client'
import { approveTalk } from "@/app/talks/actions/add-talk";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { type SwitchProps } from "@radix-ui/react-switch";
import { useEffect, useRef } from "react";
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

export default function ApprovalSwitch({ noteId, approved = false }: ApprovalSwitchProps) {
    const [state, formAction] = useFormState(approveTalk, { approved, success: false, message: '' })
    const formRef = useRef<HTMLFormElement>(null)
    const { toast } = useToast();
    const handleSubmit = () => {
        formRef.current?.requestSubmit()
    }
    return (
        <form ref={formRef} action={formAction}>
            <Input className="hidden" name="noteId" value={noteId} disabled />
            <div className="flex gap-3 items-center border border-solid rounded-full p-4">
                <SwitchSubmit name="approved" checked={state.approved} onCheckedChange={handleSubmit} />
                <h4 className="text-xl">Approve</h4>
            </div>
        </form>
    )
}
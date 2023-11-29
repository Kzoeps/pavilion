'use client'
import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps{
    label: string;
    pendingLabel: string;
}

export default function SubmitButton({label, pendingLabel, ...props}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button {...props} type="submit" disabled={pending} aria-disabled={pending}>{pending ? pendingLabel : label}</Button>
    )
}
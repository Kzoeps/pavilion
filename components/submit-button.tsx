'use client'
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    label: string;
    pendingLabel: string;
}

export default function SubmitButton({label, pendingLabel}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} aria-disabled={pending}>{pending ? pendingLabel : label}</Button>
    )
}
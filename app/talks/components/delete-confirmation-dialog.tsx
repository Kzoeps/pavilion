'use client'
import { deleteTalk } from "../actions/add-talk";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/submit-button";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DeleteConfirmationAlertDialogProps {
    id: number | string;
    children?: React.ReactNode;
}
export default function DeleteConfirmationAlertDialog({ id, children }: DeleteConfirmationAlertDialogProps) {
    const { toast } = useToast()
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [state, formAction] = useFormState(deleteTalk, { success: false, message: "" })
    useEffect(() => {
        if (state.success && state.message) {
            toast({
                title: state.message,
            })
            buttonRef.current?.click()
        }
    }, [state, toast])
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    {children || <Button variant={"destructive"} >Delete</Button>}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Are you sure you want to delete this talk?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        This action is permanent and cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel ref={buttonRef}>Cancel</AlertDialogCancel>
                        <form action={formAction}>
                            <Input type="hidden" value={id.toString()} name="id" required id="id" />
                            <SubmitButton variant={"destructive"} label="Delete" pendingLabel="Deleting" />
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
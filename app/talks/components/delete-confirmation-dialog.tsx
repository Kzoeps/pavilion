import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface DeleteConfirmationAlertDialogProps {
    children: React.ReactNode;
}
export default function DeleteConfirmationAlertDialog({ children }: DeleteConfirmationAlertDialogProps) {
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
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" >Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
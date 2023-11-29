import AddStudentForm from "@/app/dashboard/student-addition-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddTalkForm from "./add-talk-form";
import { auth } from "@/app/auth";
import { PRIVILEGED_USERS } from "@/lib/constants";
import { PavilionUser, Roles, Talks } from "@/lib/types";
import { ReactNode } from "react";

interface AddTalkDialogProps{
    type?: 'create' | 'edit';
    children?: ReactNode;
    data?: Talks
}
export default async function AddTalkDialog({ children, type = 'create', data }: AddTalkDialogProps) {
    const session = await auth();
    const config = {
        create: {
            title: 'Create Talk',
            description: 'Once you create a talk, everyone will be able to see it.'
        },
        edit: {
            title: 'Edit Talk',
            description: 'Edit your details and don\'t forget to save to update the talk.'
        }
    }
    if (!PRIVILEGED_USERS.includes((session?.user as PavilionUser)?.role as Roles)) {
        return null;
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    { children || <Button>Create Talk</Button>}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{config[type].title}</DialogTitle>
                        <DialogDescription>
                            {config[type].description}
                        </DialogDescription>
                    </DialogHeader>
                    <AddTalkForm type={type} {...(data || {})}/>
                </DialogContent>
            </Dialog>
        </>
    )
}
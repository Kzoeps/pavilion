import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PavilionUser, Roles, Talks } from "@/lib/types";
import { displayTime } from "@/lib/utils";
import { ArrowRightIcon, TrashIcon, Pencil1Icon } from '@radix-ui/react-icons';
import AddTalkDialog from "./add-talk-dialog";
import { auth } from "@/app/auth";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";
import Link from "next/link";

interface TalksCardProps extends Talks { }

export default async function TalksCard(props: TalksCardProps) {
    const session = await auth()
    const { id, title, description, datetime, location, creator_id } = props;
    return (
        <>
            <Card className="relative shadow-md">
                <CardHeader>
                    <CardTitle className="text-md flex justify-between align-center" >{title}
                        {(session?.user as PavilionUser)?.role === Roles.STUDENT && <Link href={`/talks/${id}`}>
                            <Button variant={'ghost'} size={'icon'}>
                                <ArrowRightIcon />
                            </Button>
                        </Link>}
                    </CardTitle>
                    <CardDescription>{displayTime(datetime)} | {location}</CardDescription>
                    {(session?.user as PavilionUser)?.id.toString() === creator_id.toString() && <DeleteConfirmationDialog id={id}>
                        <Button variant={'destructive'} size={"icon"} className="absolute -top-4 right-8">
                            <TrashIcon />
                        </Button>
                    </DeleteConfirmationDialog>}
                    {(session?.user as PavilionUser)?.id.toString() === creator_id.toString() && <AddTalkDialog data={props} type="edit">
                        <Button size="icon" className="absolute -top-4 -right-4" ><Pencil1Icon /></Button>
                    </AddTalkDialog >}
                </CardHeader>
                <CardContent>
                    <p className="text-sm">
                        {description}
                    </p>
                </CardContent>
            </Card>
        </>
    )
}
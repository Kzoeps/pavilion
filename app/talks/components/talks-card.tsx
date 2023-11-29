import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PavilionUser, Talks } from "@/lib/types";
import { displayTime } from "@/lib/utils";
import { TrashIcon, Pencil1Icon } from '@radix-ui/react-icons';
import AddTalkDialog from "./add-talk-dialog";
import { auth } from "@/app/auth";

interface TalksCardProps extends Talks { }

export default async function TalksCard(props: TalksCardProps) {
    const session = await auth()
    const { title, description, datetime, location, creator_id } = props;
    return (
        <>
            <Card className=" relative shadow-md">
                <CardHeader>
                    <CardTitle className=" text-md" >{title}</CardTitle>
                    <CardDescription>{displayTime(datetime)} | {location}</CardDescription>
                    <Button variant={'destructive'} size={"icon"} className="absolute -top-4 right-8">
                        <TrashIcon/>
                    </Button>
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Talks } from "@/lib/types";
import { displayTime } from "@/lib/utils";
import { Pencil1Icon } from '@radix-ui/react-icons';
import AddTalkDialog from "./add-talk-dialog";

interface TalksCardProps extends Talks { }

export default function TalksCard(props: TalksCardProps) {
    const { title, description, datetime, location, creator_id } = props;
    return (
        <>
            <Card className=" relative shadow-md">
                <CardHeader>
                    <CardTitle className=" text-md" >{title}</CardTitle>
                    <CardDescription>{displayTime(datetime)} | {location}</CardDescription>
                    <AddTalkDialog data={props} type="edit">
                        <Button size="icon" className="absolute -top-4 -right-4 bottom-2" ><Pencil1Icon /></Button>
                    </AddTalkDialog >
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
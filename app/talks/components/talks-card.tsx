import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { displayTime } from "@/lib/utils";
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button";

interface TalksCardProps {
    title: string;
    description: string;
    datetime: Date;
    location: string;
    creator_id?: string;
}

export default function TalksCard(props: TalksCardProps) {
    const { title, description, datetime, location, creator_id } = props;
    return (
        <>
            <Card className=" relative shadow-md">
                <CardHeader>
                    <CardTitle className=" text-md" >{title}</CardTitle>
                    <CardDescription>{displayTime(datetime)} | {location}</CardDescription>
                    <Button size="icon" className="absolute -top-4 -right-4 bottom-2" ><Pencil1Icon/></Button>
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { displayTime } from "@/lib/utils";

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
            <Card className=" shadow-md">
                <CardHeader>
                    <CardTitle className=" text-md" >{title}</CardTitle>
                    <CardDescription>{displayTime(datetime)} | {location}</CardDescription>
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
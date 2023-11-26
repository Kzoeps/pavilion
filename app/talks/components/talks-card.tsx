import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function TalksCard() {
    return (
        <>
            <Card className=" shadow-md">
                <CardHeader>
                    <CardTitle className=" text-md" >Public Cloud with Amit Singha</CardTitle>
                    <CardDescription>November 14th 2023; 2:30 PM at Ernst Common Room</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">
                        Amit will give a brief talk with an extended Q&A on his career in the intersection of CS+finance.  We are aiming to make this not so much a formal presentation, but more of a casual, interactive conversation, so please plan to bring all your career advice questions.
                        Amit majored in Computer Science and has spent nearly a decade working at Wall Street banks. Hes currently the Global Head of Cloud Financials at Citigroup, where he leads product and engineering teams building a multi-cloud platform. He previously was an engineering lead at Goldman Sachs, architecting and building highly distributed services which power the Apple Card. In his free time, he likes to read, travel, and play poker.
                    </p>
                </CardContent>
            </Card>

        </>
    )
}
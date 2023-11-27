import { sql } from "@vercel/postgres";
import TalksCard from "./talks-card";
import { Talks } from "@/lib/types";

interface TalksDisplayProps {
    year?: string
}
export default async function TalksDisplay({ year }: TalksDisplayProps) {
    let filterYear = year || new Date().getFullYear();
    const { rows: talks } = await sql<Talks>`SELECT * FROM talks WHERE EXTRACT(YEAR FROM datetime) = ${filterYear}`
    return (
        <>
            <section className="grid gap-x-3 gap-y-8 grid-cols-3">
                {talks.map((talk) => {
                    return (
                        <TalksCard key={talk.id} title={talk.title} description={talk.description} location={talk.location} datetime={talk.datetime} />
                    )
                })}
            </section>
        </>
    )
}